import { PostQuoteInterface } from '@project/shared/core';
import { BlogPostEntity } from '../blog-post.entity';

export class PostQuoteEntity extends BlogPostEntity {
  public authorId: string;
  public text: string;

  constructor(post: PostQuoteInterface) {
    super(post)

    if(!post) {
      return;
    }

    this.authorId = post.authorId;
    this.text = post.text;
    this.populate(post);
  }

  public toPOJO(): PostQuoteInterface {
    return {
      ...super.toPOJO(),
      authorId: this.authorId,
      text: this.text,
    };
  }
}
