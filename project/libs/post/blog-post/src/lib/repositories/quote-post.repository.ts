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

  public async create(entity: QuotePostEntity): Promise<QuotePostEntity> {
    const quotePost = await this.dbClient.quotePost.create({
      data: { ...entity }
    });

    entity.id = quotePost.id;

    return entity;
  }

  public async deleteById(id: string): Promise<void> {
    await this.dbClient.quotePost.delete({
      where: { id }
    });
  }
}
