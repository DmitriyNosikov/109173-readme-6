import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/data-access'
import { PostVideoEntity } from '../entities/post-video.entity';
import { PostVideoFactory } from '../factories/post-video.factory';

@Injectable()
export class PostVideoRepository extends BaseMemoryRepository<PostVideoEntity> {
  constructor(entityFactory: PostVideoFactory){
    super(entityFactory);
  }
}
