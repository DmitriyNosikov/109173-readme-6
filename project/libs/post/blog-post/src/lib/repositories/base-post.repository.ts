import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';

import { BasePostInterface, TagInterface } from '@project/shared/core';
import { BasePostEntity } from '../entities/base-post.entity';
import { BasePostFactory } from '../factories/base-post.factory';

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
        extraFields: undefined
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
        extraFields: true
      }
    });

    if(!document) {
      throw new NotFoundException(`Document with id ${entityId} not found`);
    }

    console.log('FOUND POST: ', document);

    const post = this.createEntityFromDocument(document as BasePostEntity);

    console.log('FOUND POST (AFTER MODIFY): ', post);

    return post;
  }

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
        extraFields: undefined
      }
    });

    return this.createEntityFromDocument(document);
  }

  // public deleteById(id: string): Promise<void> {}

  private convertTagsToObjects(tags: TagInterface[]) {
    const tagsObjects = tags.map((tag) => ({ id: tag.id}));

    return tagsObjects;
  }
}
