import { PostPhotoInterface } from '@project/shared/core';
import { BlogPostEntity } from '../blog-post.entity';

export class PostPhotoEntity extends BlogPostEntity {
  public photoURL: string;

  constructor(post: PostPhotoInterface) {
    super(post)

    if(!post) {
      return;
    }

    this.photoURL = post.photoURL;
    this.populate(post);
  }

  public toPOJO(): PostPhotoInterface {
    return {
      ...super.toPOJO(),
      photoURL: this.photoURL
    };
  }
}
