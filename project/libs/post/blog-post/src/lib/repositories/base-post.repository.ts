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
    const entityPlainObject = entity.toPOJO();
    const record = await this.dbClient.post.create({
      data: {
        ...entityPlainObject,

        tags: entityPlainObject.tags ? {
          create: entityPlainObject.tags
        } : undefined,

        comments: {
          create: entityPlainObject.comments
        },

        likes: entityPlainObject.likes ? {
          create: entityPlainObject.likes
        }: undefined,
      },
    });

    entity.id = record.id;

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
        postRelation: true
      }
    });

    if(!document) {
      throw new NotFoundException(`Document with id ${entityId} not found`);
    }

    console.log('Found post: ', document);

    // this.createEntityFromDocument(document);

    return null;
  }

  // public async updateById(
  //   entityId: string,
  //   updatedFields: Partial<BasePostEntity>
  // ): Promise<void | BasePostEntity> {}

  // public deleteById(id: string): Promise<void> {}
}
