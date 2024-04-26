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
}
