import { PostVideoInterface, StorableEntity } from '@project/shared/core';
import { BlogPostEntity } from '../blog-post.entity';

export class PostVideoEntity extends BlogPostEntity implements StorableEntity<PostVideoInterface> {
  public title: string;
  public videoURL: string;

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
