import { BasePostInterface, CommentInterface, Entity, UserInterface } from '@project/shared/core'

export class CommentEntity extends Entity implements CommentInterface {
  public createdAt?: Date;
  public updatedAt?: Date;

  public postId: BasePostInterface['id'];
  public authorId: UserInterface['id'];
  public text: string;

  constructor(comment?: CommentInterface) {
    super();

    this.populate(comment);
  }

  public populate(comment?: CommentInterface) {
    this.id = comment.id ?? '';
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
    this.postId = comment.postId;
    this.authorId = comment.authorId;
    this.text = comment.text;
  }

  public toPOJO(): CommentInterface {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postId: this.postId,
      authorId: this.authorId,
      text: this.text
    };
  }
}
