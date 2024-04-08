import { Entity, PostQuoteInterface, StorableEntity } from '@project/shared/core';

export class PostQuoteEntity extends Entity implements PostQuoteInterface, StorableEntity<PostQuoteInterface> {
  public authorId: string;
  public text: string;

  constructor(post: PostQuoteInterface) {
    super()

    if(!post) {
      return;
    }

    this.authorId = post.authorId;
    this.text = post.text;
  }

  public toPOJO(): PostQuoteInterface {
    return {
      authorId: this.authorId,
      text: this.text,
    };
  }
}
