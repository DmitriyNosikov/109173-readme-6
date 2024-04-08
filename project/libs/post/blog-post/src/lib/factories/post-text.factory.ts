import { EntityFactory, PostTextInterface } from '@project/shared/core';
import { PostTextEntity } from '../entities/post-text.entity';

export class PostTextFactory implements EntityFactory<PostTextEntity> {
  public create(entityPlainData: PostTextInterface): PostTextEntity {
    return new PostTextEntity(entityPlainData);
  }
}
