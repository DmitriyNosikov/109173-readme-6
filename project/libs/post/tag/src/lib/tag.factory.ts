import { EntityFactory, TagInterface } from '@project/shared/core';
import { TagEntity } from './tag.entity';

export class TagFactory implements EntityFactory<TagEntity> {
  create(entityPlainData: TagInterface): TagEntity {
    return new TagEntity(entityPlainData);
  }
}
