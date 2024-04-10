import { EntityFactory, PostPhotoInterface } from '@project/shared/core';
import { PostPhotoEntity } from '../entities/post-photo.entity';

export class PostPhotoFactory implements EntityFactory<PostPhotoEntity> {
  public create(entityPlainData: PostPhotoInterface): PostPhotoEntity {
    return new PostPhotoEntity(entityPlainData);
  }
}
