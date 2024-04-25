import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';

import { PostTextInterface } from '@project/shared/core';
import { PostTextEntity } from '../entities/post-text.entity';
import { PostTextFactory } from '../factories/post-text.factory';

@Injectable()
export class PostTextRepository extends BasePostgresRepository<PostTextEntity, PostTextInterface> {
  constructor(
    entityFactory: PostTextFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }

  public async create(entity: PostTextEntity): Promise<PostTextEntity> {
    const textPostPlainObject = entity.toPOJO();

    const postText = await this.dbClient.textPost.create({
      data: { ...textPostPlainObject }
    });

    entity.id = postText.id;

    return entity;
  }
}
