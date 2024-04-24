import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';

import { PostPhotoInterface } from '@project/shared/core';
import { PostPhotoEntity } from '../entities/post-photo.entity';
import { PostPhotoFactory } from '../factories/post-photo.factory';

@Injectable()
export class PostPhotoRepository extends BasePostgresRepository<PostPhotoEntity, PostPhotoInterface> {
  constructor(
    entityFactory: PostPhotoFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }
}
