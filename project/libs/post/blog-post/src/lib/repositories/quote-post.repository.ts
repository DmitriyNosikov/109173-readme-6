import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';

import { QuotePostInterface } from '@project/shared/core';
import { QuotePostEntity } from '../entities/quote-post.entity';
import { QuotePostFactory } from '../factories/quote-post.factory';

@Injectable()
export class QuotePostRepository extends BasePostgresRepository<QuotePostEntity, QuotePostInterface> {
  constructor(
    entityFactory: QuotePostFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }
}
