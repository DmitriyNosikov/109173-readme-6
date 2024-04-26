import { EntityFactory, QuotePostInterface } from '@project/shared/core';
import { QuotePostEntity } from '../entities/quote-post.entity';

export class QuotePostFactory implements EntityFactory<QuotePostEntity> {
  public create(entityPlainData: QuotePostInterface): QuotePostEntity {
    return new QuotePostEntity(entityPlainData);
  }
}
