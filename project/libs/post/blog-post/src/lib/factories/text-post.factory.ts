import { EntityFactory, TextPostInterface } from '@project/shared/core';
import { TextPostEntity } from '../entities/text-post.entity';

export class TextPostFactory implements EntityFactory<TextPostEntity> {
  public create(entityPlainData: TextPostInterface): TextPostEntity {
    return new TextPostEntity(entityPlainData);
  }
}
