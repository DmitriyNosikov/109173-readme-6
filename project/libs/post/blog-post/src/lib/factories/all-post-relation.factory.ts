import { Injectable } from '@nestjs/common';
import { AllPostRelationInterface, EntityFactory } from '@project/shared/core';
import { AllPostRelationEntity } from '../entities/all-post-relation.entity';

@Injectable()
export class AllPostRelationFactory implements EntityFactory<AllPostRelationEntity> {
  public create(entityPlainData: AllPostRelationInterface): AllPostRelationEntity {
    return new AllPostRelationEntity(entityPlainData);
  }
}
