import { BasePostInterface, Entity, UserInterface } from '@project/shared/core'
import { LikeInterface } from './like.interface';

export class LikeEntity extends Entity implements LikeInterface {
  public createdAt?: Date;
  public updatedAt?: Date;

  public postId: BasePostInterface['id'];
  public authorId: UserInterface['id'];

  constructor(like?: LikeInterface) {
    super();

    this.populate(like);
  }

  public populate(like?: LikeInterface) {
    this.id = like.id;
    this.createdAt = like.createdAt;
    this.updatedAt = like.updatedAt;
    this.postId = like.postId;
    this.authorId = like.authorId;
  }

  public toPOJO(): LikeInterface {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postId: this.postId,
      authorId: this.authorId
    };
  }
}
