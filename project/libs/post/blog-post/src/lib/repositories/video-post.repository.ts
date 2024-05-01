import { Injectable } from '@nestjs/common';
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

  public async create(entity: VideoPostEntity): Promise<VideoPostEntity> {
    const videoPost = await this.dbClient.videoPost.create({
      data: { ...entity }
    });

    entity.id = videoPost.id;

    return entity;
  }

  public async deleteById(id: string): Promise<void> {
    await this.dbClient.videoPost.delete({
      where: { id }
    });
  }
}
