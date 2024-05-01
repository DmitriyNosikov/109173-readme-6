import { Injectable, NotFoundException } from '@nestjs/common';
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

  public async findById(id: string): Promise<PhotoPostEntity | null> {
    return await this.exists(id);
  }

  public async create(entity: PhotoPostEntity): Promise<PhotoPostEntity> {
    const photoPost = await this.dbClient.photoPost.create({
      data: { ...entity }
    });

    entity.id = photoPost.id;

    return entity;
  }

  public async updateById(
    id: string,
    updatedFields: Partial<PhotoPostEntity>
  ): Promise<PhotoPostEntity | void> {

    await this.exists(id);

    const document = await this.dbClient.photoPost.update({
      where: { id },
      data: { ...updatedFields }
    });

    const photoPost = this.createEntityFromDocument(document);

    return photoPost;
  }

  public async deleteById(id: string): Promise<void> {
    await this.dbClient.photoPost.delete({
      where: { id }
    });
  }

  public async exists(id: string): Promise<PhotoPostEntity | null> {
    const document = await this.dbClient.photoPost.findFirst({
      where: { id }
    });

    if(!document) {
      throw new NotFoundException(`Can't find Photo Post with id ${id}`);
    }

    const photoPost = this.createEntityFromDocument(document);

    return photoPost;
  }
}
