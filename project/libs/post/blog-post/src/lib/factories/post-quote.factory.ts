import { EntityFactory, PostQuoteInterface } from '@project/shared/core';
import { PostQuoteEntity } from '../entities/post-quote.entity';

export class PostQuoteFactory implements EntityFactory<PostQuoteEntity> {
  public create(entityPlainData: PostQuoteInterface): PostQuoteEntity {
    return new PostQuoteEntity(entityPlainData);
  }
}
