import { Injectable } from '@nestjs/common';
import { EntityFactory, PostToExtraFieldsInterface } from '@project/shared/core';
import { PostToExtraFieldsEntity } from '../entities/post-to-extra-fields.entity';

@Injectable()
export class PostToExtraFieldsFactory implements EntityFactory<PostToExtraFieldsEntity> {
  public create(entityPlainData: PostToExtraFieldsInterface): PostToExtraFieldsEntity {
    return new PostToExtraFieldsEntity(entityPlainData);
  }
}
