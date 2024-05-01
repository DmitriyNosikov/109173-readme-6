import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';

import { PhotoPostInterface } from '@project/shared/core';
import { PhotoPostEntity } from '../entities/photo-post.entity';
import { PhotoPostFactory } from '../factories/photo-post.factory';

@Injectable()
export class PhotoPostRepository extends BasePostgresRepository<PhotoPostEntity, PhotoPostInterface> {
  constructor(
    entityFactory: PhotoPostFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }

  public async create(entity: PhotoPostEntity): Promise<PhotoPostEntity> {
    const photoPost = await this.dbClient.photoPost.create({
      data: { ...entity }
    });

    entity.id = photoPost.id;

    return entity;
  }

  public async deleteById(id: string): Promise<void> {
    await this.dbClient.photoPost.delete({
      where: { id }
    });
  }
}
