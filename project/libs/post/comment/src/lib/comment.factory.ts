import { CommentInterface, EntityFactory } from '@project/shared/core';
import { CommentEntity } from './comment.entity';

export class CommentFactory implements EntityFactory<CommentEntity> {
  create(entityPlainData: CommentInterface): CommentEntity {
    return new CommentEntity(entityPlainData);
  }
}
