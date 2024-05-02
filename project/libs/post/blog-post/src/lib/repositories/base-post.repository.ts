import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';
import { Prisma } from '@prisma/client';

import { BasePostInterface, PaginationResult, TagInterface } from '@project/shared/core';
import { BasePostEntity } from '../entities/base-post.entity';
import { BasePostFactory } from '../factories/base-post.factory';
import { BlogPostQuery } from '../blog-post.query';

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
       postTags = this.convertTagsToObjects(entity.tags);
    }

    console.log('ENTITY: ', entity);

    const post = await this.dbClient.post.create({
      data: {
        ...entity,

        tags: postTags ? {
          connect: postTags
        } : undefined,

        // По идее, лайков и комментариев не может быть у нового поста
        // (на текущий момент так)
        comments: undefined,
        likes: undefined,
        postToExtraFields: undefined
      },
    });

    entity.id = post.id;
    entity.createdAt = post.createdAt;
    entity.updatedAt = post.updatedAt;
    entity.publishedAt = post.publishedAt;

    return entity;
  }

  public async findById(entityId: string): Promise<BasePostEntity | null> {
    const document = await this.dbClient.post.findFirst({
      where: {
        id: entityId
      },
      include: {
        tags: true,
        comments: true,
        likes: true,
        postToExtraFields: true
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
          likes: true,
          comments: true,
          postToExtraFields: true
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

  // TODO: Пока не реализовано
  public async updateById(
    entityId: string,
    updatedFields: Partial<BasePostEntity>
  ): Promise<void | BasePostEntity> {
    let postTags = undefined;

    if(updatedFields.tags && updatedFields.tags.length > 0) {
       postTags = this.convertTagsToObjects(updatedFields.tags);
    }

    const document = await this.dbClient.post.update({
      where: { id: entityId },
      data: {
        ...updatedFields,

        tags: postTags ? {
          connect: postTags
        } : undefined,

        // TODO: Поправить в будущем
        comments: undefined,
        likes: undefined,
        postToExtraFields: undefined
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

  private convertTagsToObjects(tags: TagInterface[]) {
    const tagsObjects = tags.map((tag) => ({ id: tag.id}));

    return tagsObjects;
  }
}
