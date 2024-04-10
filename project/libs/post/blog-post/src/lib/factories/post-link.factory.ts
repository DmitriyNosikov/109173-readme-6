import { EntityFactory, PostLinkInterface } from '@project/shared/core';
import { PostLinkEntity } from '../entities/post-link.entity';

export class PostLinkFactory implements EntityFactory<PostLinkEntity> {
  public create(entityPlainData: PostLinkInterface): PostLinkEntity {
    return new PostLinkEntity(entityPlainData);
  }
}
