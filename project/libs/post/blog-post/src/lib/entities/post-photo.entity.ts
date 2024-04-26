import { Entity, PostPhotoInterface, StorableEntity } from '@project/shared/core';
export class PostPhotoEntity extends Entity implements PostPhotoInterface, StorableEntity<PostPhotoInterface> {
  public photoURL: string;

  constructor(extraFields: PostPhotoInterface) {
    super()

    if(!extraFields) {
      return;
    }

    this.id = extraFields.id ?? undefined;
    this.photoURL = extraFields.photoURL;
  }

  public toPOJO(): PostPhotoInterface {
    return {
      id: this.id,
      photoURL: this.photoURL
    };
  }
}
