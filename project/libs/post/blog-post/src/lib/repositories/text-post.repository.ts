import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';

import { TextPostInterface } from '@project/shared/core';
import { TextPostEntity } from '../entities/text-post.entity';
import { TextPostFactory } from '../factories/text-post.factory';

@Injectable()
export class TextPostRepository extends BasePostgresRepository<TextPostEntity, TextPostInterface> {
  constructor(
    entityFactory: TextPostFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }

  public async create(entity: TextPostEntity): Promise<TextPostEntity> {
    const TextPost = await this.dbClient.textPost.create({
      data: { ...entity }
    });

    entity.id = TextPost.id;

    return entity;
  }

  public async deleteById(id: string): Promise<void> {
    console.log('TEXT ID: ', id);
    await this.dbClient.textPost.delete({
      where: { id }
    });
  }
}
