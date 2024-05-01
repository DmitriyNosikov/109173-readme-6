import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';

import { VideoPostInterface } from '@project/shared/core';
import { VideoPostEntity } from '../entities/video-post.entity';
import { VideoPostFactory } from '../factories/video-post.factory';

@Injectable()
export class VideoPostRepository extends BasePostgresRepository<VideoPostEntity, VideoPostInterface> {
  constructor(
    entityFactory: VideoPostFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }

  public async findById(id: string): Promise<VideoPostEntity | null> {
    return await this.exists(id);
  }

  public async create(entity: VideoPostEntity): Promise<VideoPostEntity> {
    const videoPost = await this.dbClient.videoPost.create({
      data: { ...entity }
    });

    entity.id = videoPost.id;

    return entity;
  }

  public async updateById(
    id: string,
    updatedFields: Partial<VideoPostEntity>
  ): Promise<VideoPostEntity | void> {

    await this.exists(id);

    const document = await this.dbClient.videoPost.update({
      where: { id },
      data: { ...updatedFields }
    });

    const videoPost = this.createEntityFromDocument(document);

    return videoPost;
  }

  public async deleteById(id: string): Promise<void> {
    await this.dbClient.videoPost.delete({
      where: { id }
    });
  }

  public async exists(id: string): Promise<VideoPostEntity | null> {
    const document = await this.dbClient.videoPost.findFirst({
      where: { id }
    });

    if(!document) {
      throw new NotFoundException(`Can't find Video Post with id ${id}`);
    }

    const videoPost = this.createEntityFromDocument(document);

    return videoPost;
  }
}
