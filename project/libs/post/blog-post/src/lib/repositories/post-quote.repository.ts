import { BaseMemoryRepository } from '@project/shared/data-access'
import { Injectable } from '@nestjs/common';
import { PostQuoteEntity } from '../entities/post-quote.entity';
import { PostQuoteFactory } from '../factories/post-quote.factory';

@Injectable()
export class PostQuoteRepository extends BaseMemoryRepository<PostQuoteEntity> {
  constructor(entityFactory: PostQuoteFactory){
    super(entityFactory);
  }
}
