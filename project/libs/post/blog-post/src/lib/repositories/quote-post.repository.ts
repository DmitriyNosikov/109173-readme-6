import { Injectable, NotFoundException } from '@nestjs/common';
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

  public async findById(id: string): Promise<QuotePostEntity | null> {
    return await this.exists(id);
  }

  public async create(entity: QuotePostEntity): Promise<QuotePostEntity> {
    const quotePost = await this.dbClient.quotePost.create({
      data: { ...entity }
    });

    entity.id = quotePost.id;

    return entity;
  }

  public async updateById(
    id: string,
    updatedFields: Partial<QuotePostEntity>
  ): Promise<QuotePostEntity | void> {

    await this.exists(id);

    const document = await this.dbClient.quotePost.update({
      where: { id },
      data: { ...updatedFields }
    });

    const quotePost = this.createEntityFromDocument(document);

    return quotePost;
  }

  public async deleteById(id: string): Promise<void> {
    await this.dbClient.quotePost.delete({
      where: { id }
    });
  }

  public async exists(id: string): Promise<QuotePostEntity | null> {
    const document = await this.dbClient.quotePost.findFirst({
      where: { id }
    });

    if(!document) {
      throw new NotFoundException(`Can't find Quote Post with id ${id}`);
    }

    const quotePost = this.createEntityFromDocument(document);

    return quotePost;
  }
}
