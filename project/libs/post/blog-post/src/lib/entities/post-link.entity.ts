import { Entity, PostLinkInterface, StorableEntity } from '@project/shared/core';

export class PostLinkEntity extends Entity implements PostLinkInterface, StorableEntity<PostLinkInterface> {
  public linkURL: string;
  public description: string;

  constructor(extraFields: PostLinkInterface) {
    super()

    if(!extraFields) {
      return;
    }

    this.id = extraFields.id ?? undefined;
    this.linkURL = extraFields.linkURL;
    this.description = extraFields.description;
  }

  public toPOJO(): PostLinkInterface {
    return {
      id: this.id,
      linkURL: this.linkURL,
      description: this.description
    };
  }
}
