import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';
import { Prisma } from '@prisma/client';

import { BasePostInterface, PaginationResult, SortDirectionEnum, SortTypeEnum } from '@project/shared/core';
import { BasePostEntity } from '../entities/base-post.entity';
import { BasePostFactory } from '../factories/base-post.factory';
import { BlogPostQuery } from '../blog-post.query';
import { DEFAULT_PAGE_COUNT, DEFAULT_SORT_DIRECTION, DEFAULT_SORT_TYPE, MAX_POSTS_PER_PAGE } from '../blog-post.constant';

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
        likes: undefined
      },
      include: {
        tags: true,
        comments: true,
        likes: true
      }
    });

    const post = this.createEntityFromDocument(document);

    return post;
  }

  public async getPaginatedPosts(
    page: number = DEFAULT_PAGE_COUNT,
    itemsCount: number = MAX_POSTS_PER_PAGE,
    sortType: SortTypeEnum = DEFAULT_SORT_TYPE,
    sortDirection: SortDirectionEnum = DEFAULT_SORT_DIRECTION
  ): Promise<PaginationResult<BasePostEntity>> {
    itemsCount = (itemsCount > MAX_POSTS_PER_PAGE ) ? MAX_POSTS_PER_PAGE : itemsCount;

    const take = itemsCount;
    const skip = (page && itemsCount) ? (page - 1) * itemsCount : undefined;
    const orderBy = {};

    orderBy[sortType] = sortDirection;

    const [posts, postsCount] = await Promise.all([
      this.dbClient.post.findMany({
        where: {
          isPublished: true
        },
        include: {
          tags: true,
          comments: true,
          likes: true
        },

        // Pagination
        take,
        skip,
        orderBy
      }),
      this.dbClient.post.count()
    ]);

    return {
      entities: posts.map((post) => this.createEntityFromDocument(post)),
      totalPages: Math.ceil(postsCount / itemsCount),
      totalItems: postsCount,
      currentPage: page,
      itemsPerPage: itemsCount,
    }
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

  public async find(query?: BlogPostQuery): Promise<PaginationResult<BasePostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    // Поиск по title (WIP - пока не работает, т.к. title в доп. таблицах и пока непонятно, как это реализовать)
    if (query?.title) {
      // where.postToExtraFields = {
      //   some: {
      //     title: {
      //       search: query.title
      //     }
      //   }
      // }
    }

    // Сортировка и направление сортировки
    if (query?.sortType && query?.sortDirection) {
      orderBy[query.sortType] = query.sortDirection;
    }

    const [records, postCount] = await Promise.all([
      this.dbClient.post.findMany({ where, orderBy, skip, take,
        include: {
          tags: true,
          comments: true,
          likes: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    }
  }

  public async updateById(
    entityId: string,
    updatedFields: Partial<BasePostEntity>
  ): Promise<void | BasePostEntity> {
    const document = await this.dbClient.post.update({
      where: { id: entityId },
      data: {
        ...updatedFields,

        tags: (updatedFields.tags && updatedFields.tags.length > 0) ? {
          connect: updatedFields.tags, // Connect new tags
          // disconnect: updatedFields.tags, // Remove only passed tags
        } : {
          set: [] // Remove all tags
        },

        comments: updatedFields.comments ? {
          connect: updatedFields.comments
        } : undefined,

        // TODO: ОБъеденить с соответствующими записями
        likes: {
          connect: []
        },
      },
      include: {
        tags: true,
        comments: true,
        likes: true
      }
    });

    return this.createEntityFromDocument(document);
  }

  public async deleteById(postId: string): Promise<void> {
    await this.dbClient.post.delete({
      where: { id: postId }
    });
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.dbClient.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }
}
