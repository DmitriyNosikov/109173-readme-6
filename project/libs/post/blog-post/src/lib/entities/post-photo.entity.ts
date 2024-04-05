import { PostPhotoInterface, StorableEntity } from '@project/shared/core';
import { BlogPostEntity } from '../blog-post.entity';

export class PostPhotoEntity extends BlogPostEntity implements StorableEntity<PostPhotoInterface> {
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
