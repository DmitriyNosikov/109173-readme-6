import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';

import { PostLinkInterface } from '@project/shared/core';
import { PostLinkEntity } from '../entities/post-link.entity';
import { PostLinkFactory } from '../factories/post-link.factory';

@Injectable()
export class PostLinkRepository extends BasePostgresRepository<PostLinkEntity, PostLinkInterface> {
  constructor(
    entityFactory: PostLinkFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }
}
