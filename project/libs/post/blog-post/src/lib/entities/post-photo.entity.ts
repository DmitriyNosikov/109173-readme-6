import { Entity, PostPhotoInterface, StorableEntity } from '@project/shared/core';
export class PostPhotoEntity extends Entity implements PostPhotoInterface, StorableEntity<PostPhotoInterface> {
  public photoURL: string;

  constructor(extraFields: PostPhotoInterface) {
    super()

    if(!extraFields) {
      return;
    }

    this.photoURL = extraFields.photoURL;
  }

  public toPOJO(): PostPhotoInterface {
    return {
      photoURL: this.photoURL
    };
  }
}
