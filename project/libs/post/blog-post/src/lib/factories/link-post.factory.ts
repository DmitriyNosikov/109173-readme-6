import { EntityFactory, LinkPostInterface } from '@project/shared/core';
import { LinkPostEntity } from '../entities/link-post.entity';

export class LinkPostFactory implements EntityFactory<LinkPostEntity> {
  public create(entityPlainData: LinkPostInterface): LinkPostEntity {
    return new LinkPostEntity(entityPlainData);
  }
}
