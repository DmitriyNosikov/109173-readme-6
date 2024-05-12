import { EntityFactory, StorableJWTTokenInterface } from '@project/shared/core'
import { Injectable } from '@nestjs/common';
import { RefreshTokenEntity } from './refresh-token.entity';

@Injectable()
export class RefreshTokenFactory implements EntityFactory<RefreshTokenEntity> {
  public create(entityPlainData: StorableJWTTokenInterface): RefreshTokenEntity {
    return new RefreshTokenEntity(entityPlainData);
  }
}
