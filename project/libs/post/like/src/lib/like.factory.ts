import { EntityFactory } from '@project/shared/core';
import { LikeInterface } from './like.interface';
import { LikeEntity } from './like.entity';

export class LikeFactory implements EntityFactory<LikeEntity> {
  create(entityPlainData: LikeInterface): LikeEntity {
    return new LikeEntity(entityPlainData);
  }
}
