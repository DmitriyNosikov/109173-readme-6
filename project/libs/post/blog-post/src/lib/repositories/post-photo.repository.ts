import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/data-access'
import { PostPhotoEntity } from '../entities/post-photo.entity';
import { PostPhotoFactory } from '../factories/post-photo.factory';

@Injectable()
export class PostPhotoRepository extends BaseMemoryRepository<PostPhotoEntity> {
  constructor(entityFactory: PostPhotoFactory){
    super(entityFactory);
  }
}
