import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';

import { PostVideoInterface } from '@project/shared/core';
import { PostVideoEntity } from '../entities/post-video.entity';
import { PostVideoFactory } from '../factories/post-video.factory';

@Injectable()
export class PostVideoRepository extends BasePostgresRepository<PostVideoEntity, PostVideoInterface> {
  constructor(
    entityFactory: PostVideoFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }
}
