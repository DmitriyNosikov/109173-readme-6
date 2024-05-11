import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';
import { Prisma } from '@prisma/client';

import { BasePostInterface, PaginationResult, SortDirectionEnum, SortType, SortTypeEnum } from '@project/shared/core';
import { BasePostEntity } from '../entities/base-post.entity';
import { BasePostFactory } from '../factories/base-post.factory';
import { BlogPostQuery } from '../blog-post.query';
import { BlogPostMessage, DEFAULT_PAGE_NUMBER, DEFAULT_SORT_DIRECTION, DEFAULT_SORT_TYPE, MAX_POSTS_PER_PAGE } from '../blog-post.constant';

@Injectable()
export class BasePostRepository extends BasePostgresRepository<BasePostEntity, BasePostInterface> {
  constructor(
    entityFactory: BasePostFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }

  public async create(entity: BasePostEntity): Promise<BasePostEntity> {
    let postTags = undefined;

    if(entity.tags && entity.tags.length > 0) {
       postTags = entity.tags.map((tag) => tag.toPOJO())
    }

    const document = await this.dbClient.post.create({
      data: {
        ...entity,

        tags: postTags ? {
          connect: postTags
        } : undefined,

        // По идее, лайков и комментариев не может быть у нового поста
        // (на текущий момент так)
        comments: undefined,
        likes: undefined,

        postToExtraFields: entity.postToExtraFields ? {
          connect: entity.postToExtraFields
        } : undefined,
      },
      include: {
        tags: true,
        comments: true,
        likes: true,
        postToExtraFields: true,

        _count: {
          select: { comments: true, likes: true }
        }
      }
    });

    const post = this.createEntityFromDocument(document);

    return post;
  }

  public async search(query?: BlogPostQuery): Promise<PaginationResult<BasePostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = (!query?.limit || query?.limit > MAX_POSTS_PER_PAGE) ? MAX_POSTS_PER_PAGE : query.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    where.isPublished = true; // Показываем только опубликованные посты

    // Поиск от определенной даты публикации
    if(query?.publishedAt) {
      where.publishedAt = {
        gte: new Date(query?.publishedAt)
      }
    }

    // Поиск по тегам
    if(query?.tags) {
      where.tags = {
        some: {
          name: {
            in: query.tags,
            mode: 'insensitive'
          }
        },
      }
    }

    // Сортировка и направление сортировки
    if (query?.sortType && query?.sortDirection) {
      const { key, value } = this.getSortKeyValue(query.sortType, query.sortDirection);

      orderBy[key] = value;
    }

    const [posts, totalPostsCount] = await Promise.all([
      this.dbClient.post.findMany({
        where,
        include: {
          tags: true,
          comments: true,
          likes: true,
          postToExtraFields: true
        },

        // Pagination
        take,
        skip,
        orderBy
      }),
      this.getPostCount(where)
    ]);

    let postsEntities = posts.map((post) => this.createEntityFromDocument(post));
    let postsCount = totalPostsCount;

    if (query?.title) {
      postsEntities = await this.filterPostsByTitle(postsEntities, query.title);
      postsCount = postsEntities.length;
    }

    return {
      entities: postsEntities,
      currentPage:  query?.page ?? 0,
      totalPages: this.calculatePostsPage(postsCount, take),
      totalItems: postsCount,
      itemsPerPage: take ?? postsCount,
    }
  }

  // Получение всех опубликованных постов без каких-либо доп. условий
  public async findAll(): Promise<BasePostEntity[] | null> {
    const documents = await this.dbClient.post.findMany({
      where: {
        isPublished: true
      },
      include: {
        tags: true,
        comments: true,
        likes: true,
        postToExtraFields: true
      }
    });

    if(!documents) {
      throw new NotFoundException(BlogPostMessage.ERROR.NOT_FOUND);
    }

    const posts = documents.map((document) => this.createEntityFromDocument(document));

    return posts;
  }

  public async findById(entityId: string): Promise<BasePostEntity | null> {
    const document = await this.dbClient.post.findFirst({
      where: {
        id: entityId
      },
      include: {
        tags: true,
        comments: true,
        likes: true
      }
    });

    if(!document) {
      throw new NotFoundException(`Document with id ${entityId} not found`);
    }

    const post = this.createEntityFromDocument(document);

    return post;
  }

  public async updateById(
    entityId: string,
    updatedFields: Partial<BasePostEntity>
  ): Promise<void | BasePostEntity> {

    let updateTags = undefined;

    if(updatedFields.tags) {
      if(updatedFields.tags.length > 0) {
        updateTags = {
          set: updatedFields.tags,
        }
      } else { // Если передали пустой массив - очищаем теги
        updateTags = {
          set: [],
        }
      }
    }

    const document = await this.dbClient.post.update({
      where: { id: entityId },
      data: {
        ...updatedFields,

        tags: updateTags,

        comments: updatedFields.comments ? {
          connect: updatedFields.comments
        } : undefined,

        likes: updatedFields.likes ? {
          connect: updatedFields.likes
        } : undefined,

        postToExtraFields: updatedFields.postToExtraFields ? {
          connect: updatedFields.postToExtraFields
        } : undefined,
      },
      include: {
        tags: true,
        comments: true,
        likes: true,
        postToExtraFields: true
      }
    });

    return this.createEntityFromDocument(document);
  }

  public async deleteById(postId: string): Promise<void> {
    await this.dbClient.post.delete({
      where: { id: postId }
    });
  }

  //////////////////// Вспомогательные методы поиска и пагинации ////////////////////
  private async filterPostsByTitle(posts, title: string) {
    const extraFieldsIDs = await this.getExtraFieldsIDsByTitle(title)

    const filteredPosts = posts.filter((postEntity) => {
      // Ищем в ExtraFields поста все поля, ID которых есть в полученных по Title ExtraFields
      const isPostIncluded = postEntity.postToExtraFields.find((postExtraFieldsItem) => {
        return extraFieldsIDs.includes(postExtraFieldsItem.extraFieldsId);
      })

      return isPostIncluded;
    });

    return filteredPosts;
  }

  private async getExtraFieldsIDsByTitle(title: string) {
    // TODO: Возможно, получится оптимизировать (позже)
    // путем создания доп. таблицы (индекса) для поиска  по title
    // Сейчас - просто получаем ID всех ExtraFields, у которых Title = запросу
    const targetTitle = `%${title}%`;
    const getExtraFieldsByTitle: Record<"id", string>[] | null = await this.dbClient.$queryRaw`
      SELECT id FROM "text_posts"  WHERE title ILIKE ${targetTitle} UNION
      SELECT id FROM "video_posts" WHERE title ILIKE ${targetTitle};
    `;
    const extraFieldsIDs = getExtraFieldsByTitle.map((item) => item.id);

    if(extraFieldsIDs.length <= 0) {
      throw new NotFoundException(`Posts with title '${title}' not found`);
    }

    return extraFieldsIDs;
  }

  private getSortKeyValue(sortType: SortTypeEnum, sortDirection: SortDirectionEnum) {
    switch(sortType) {
      case(SortType.CREATED_AT): {
        return { key: 'createdAt', value: sortDirection };
      }
      case(SortType.PUBLISHED_AT): {
        return { key: 'publishedAt', value: sortDirection };
      }
      case(SortType.COMMENTS): {
        return { key: 'comments', value: { _count: sortDirection } }
      }
      case(SortType.LIKES): {
        return { key: 'likes', value: { _count: sortDirection } }
      }
      default: {
        return { key: DEFAULT_SORT_TYPE, value: DEFAULT_SORT_DIRECTION };
      }
    }
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.dbClient.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    const postsPages = Math.ceil(totalCount / limit);
    return postsPages;
  }
}
