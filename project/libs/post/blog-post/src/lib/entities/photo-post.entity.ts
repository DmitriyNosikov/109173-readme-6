import { Entity, PhotoPostInterface, StorableEntity } from '@project/shared/core';

export class PhotoPostEntity extends Entity implements PhotoPostInterface, StorableEntity<PhotoPostInterface> {
  public photoURL: string;

  constructor(extraFields: PhotoPostInterface) {
    super()

    if(!extraFields) {
      return;
    }

    this.id = extraFields.id ?? undefined;
    this.photoURL = extraFields.photoURL;
  }

  public toPOJO(): PhotoPostInterface {
    return {
      id: this.id,
      photoURL: this.photoURL
    };
  }
}
