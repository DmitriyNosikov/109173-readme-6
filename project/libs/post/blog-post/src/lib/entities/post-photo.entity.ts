import { Entity, PostPhotoInterface, StorableEntity } from '@project/shared/core';
export class PostPhotoEntity extends Entity implements PostPhotoInterface, StorableEntity<PostPhotoInterface> {
  public photoURL: string;

  constructor(post: PostPhotoInterface) {
    super()

    if(!post) {
      return;
    }

    this.photoURL = post.photoURL;
  }

  public toPOJO(): PostPhotoInterface {
    return {
      photoURL: this.photoURL
    };
  }
}
