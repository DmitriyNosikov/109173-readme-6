import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';

import { BasePostInterface } from '@project/shared/core';
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
      postTags = entity.tags.map((tag) => ({ id: tag}));
    }

    const post = await this.dbClient.post.create({
      data: {
        ...entity,

        // Соединяем пост с существующими тегами
        // (TODO: если тега нет - надо создавать, но это, скорее всего, в APIGateway)
        // + можно при создании поста вобще передавать теги словами. Затем искать по
        // табличке с тегами - если есть - возвращать айдишники и коннектить к посту, нет -
        // создавать и коннектить
        // ^^^ Все это - ответственност TagService
        tags: postTags ? {
          connect: postTags
        } : undefined,

        // По идее, лайков и комментариев не может быть у нового поста
        // (на текущий момент так)
        comments: undefined,
        likes: undefined,
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

    // this.createEntityFromDocument(document);

    return null;
  }

  // public async updateById(
  //   entityId: string,
  //   updatedFields: Partial<BasePostEntity>
  // ): Promise<void | BasePostEntity> {}

  // public deleteById(id: string): Promise<void> {}
}
