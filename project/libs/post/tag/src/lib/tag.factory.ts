import { EntityFactory } from '@project/shared/core';
import { TagEntity } from './tag.entity';
import { TagInterface } from './tag.interface';

export class TagFactory implements EntityFactory<TagEntity> {
  create(entityPlainData: TagInterface): TagEntity {
    return new TagEntity(entityPlainData);
  }
}
