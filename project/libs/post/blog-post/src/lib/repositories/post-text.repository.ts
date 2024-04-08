import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/data-access'
import { PostTextEntity } from '../entities/post-text.entity';
import { PostTextFactory } from '../factories/post-text.factory';

@Injectable()
export class PostTextRepository extends BaseMemoryRepository<PostTextEntity> {
  constructor(entityFactory: PostTextFactory){
    super(entityFactory);
  }
}
