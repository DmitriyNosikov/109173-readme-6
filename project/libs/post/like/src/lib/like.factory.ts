import { EntityFactory, LikeInterface } from '@project/shared/core';
import { LikeEntity } from './like.entity';

export class LikeFactory implements EntityFactory<LikeEntity> {
  create(entityPlainData: LikeInterface): LikeEntity {
    return new LikeEntity(entityPlainData);
  }
}
