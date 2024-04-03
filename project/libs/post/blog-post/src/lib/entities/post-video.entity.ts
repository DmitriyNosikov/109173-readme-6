import { PostVideoInterface } from '@project/shared/core';
import { BlogPostEntity } from '../blog-post.entity';

export class PostVideoEntity extends BlogPostEntity {
  public videoURL: string;
  public title: string;

  constructor(post: PostVideoInterface) {
    super(post)

    if(!post) {
      return;
    }

    this.title = post.title;
    this.videoURL = post.videoURL;
    this.populate(post);
  }

  public toPOJO(): PostVideoInterface {
    return {
      ...super.toPOJO(),
      title: this.title,
      videoURL: this.videoURL,
    };
  }
}
