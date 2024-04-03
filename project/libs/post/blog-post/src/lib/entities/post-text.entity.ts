import { PostTextInterface } from '@project/shared/core';
import { BlogPostEntity } from '../blog-post.entity';

export class PostTextEntity extends BlogPostEntity {
  public announce: string;
  public title: string;
  public text: string;

  constructor(post: PostTextInterface) {
    super(post)

    if(!post) {
      return;
    }

    this.title = post.title;
    this.announce = post.announce;
    this.text = post.text;
    this.populate(post);
  }

  public toPOJO(): PostTextInterface {
    return {
      ...super.toPOJO(),
      title: this.title,
      announce: this.announce,
      text: this.text,
    };
  }
}
