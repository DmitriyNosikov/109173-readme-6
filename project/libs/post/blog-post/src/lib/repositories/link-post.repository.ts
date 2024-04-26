import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';

import { LinkPostInterface } from '@project/shared/core';
import { LinkPostEntity } from '../entities/link-post.entity';
import { LinkPostFactory } from '../factories/link-post.factory';

@Injectable()
export class LinkPostRepository extends BasePostgresRepository<LinkPostEntity, LinkPostInterface> {
  constructor(
    entityFactory: LinkPostFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }
}
