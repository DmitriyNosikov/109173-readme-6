import { PostLinkInterface } from '@project/shared/core';
import { BlogPostEntity } from '../blog-post.entity';

export class PostLinkEntity extends BlogPostEntity {
  public linkURL: string;
  public description: string;

  constructor(post: PostLinkInterface) {
    super(post)

    if(!post) {
      return;
    }

    this.linkURL = post.linkURL;
    this.description = post.description;
    this.populate(post);
  }

  public toPOJO(): PostLinkInterface {
    return {
      ...super.toPOJO(),
      linkURL: this.linkURL,
      description: this.description
    };
  }
}
