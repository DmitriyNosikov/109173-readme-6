import { EntityFactory, PostVideoInterface } from '@project/shared/core';
import { PostVideoEntity } from '../entities/post-video.entity';

export class PostVideoFactory implements EntityFactory<PostVideoEntity> {
  public create(entityPlainData: PostVideoInterface): PostVideoEntity {
    return new PostVideoEntity(entityPlainData);
  }
}
