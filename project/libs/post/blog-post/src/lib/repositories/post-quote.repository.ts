import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';

import { PostQuoteInterface } from '@project/shared/core';
import { PostQuoteEntity } from '../entities/post-quote.entity';
import { PostQuoteFactory } from '../factories/post-quote.factory';

@Injectable()
export class PostQuoteRepository extends BasePostgresRepository<PostQuoteEntity, PostQuoteInterface> {
  constructor(
    entityFactory: PostQuoteFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }
}
