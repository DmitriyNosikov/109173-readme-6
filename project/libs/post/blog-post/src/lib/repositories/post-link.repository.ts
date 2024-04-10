import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/data-access'
import { PostLinkEntity } from '../entities/post-link.entity';
import { PostLinkFactory } from '../factories/post-link.factory';

@Injectable()
export class PostLinkRepository extends BaseMemoryRepository<PostLinkEntity> {
  constructor(entityFactory: PostLinkFactory){
    super(entityFactory);
  }
}
