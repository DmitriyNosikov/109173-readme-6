import { BaseMemoryRepository } from '@project/shared/data-access'
import { BasePostEntity } from '../entities/base-post.entity';
import { Injectable } from '@nestjs/common';
import { BasePostFactory } from '../factories/base-post.factory';

@Injectable()
export class BasePostRepository extends BaseMemoryRepository<BasePostEntity> {
  constructor(entityFactory: BasePostFactory){
    super(entityFactory);
  }
}
