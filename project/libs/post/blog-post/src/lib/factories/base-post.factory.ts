import { Injectable } from "@nestjs/common";
import { BasePostInterface, EntityFactory } from '@project/shared/core';
import { BasePostEntity } from '../entities/base-post.entity';

@Injectable()
export class BasePostFactory implements EntityFactory<BasePostEntity> {
  public create(entityPlainData: BasePostInterface): BasePostEntity {
    return new BasePostEntity(entityPlainData);
  }
}
