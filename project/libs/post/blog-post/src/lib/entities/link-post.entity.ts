import { Entity, LinkPostInterface, StorableEntity } from '@project/shared/core';

export class LinkPostEntity extends Entity implements LinkPostInterface, StorableEntity<LinkPostInterface> {
  public linkURL: string;
  public description: string;

  constructor(extraFields: LinkPostInterface) {
    super()

    if(!extraFields) {
      return;
    }

    this.id = extraFields.id ?? undefined;
    this.linkURL = extraFields.linkURL;
    this.description = extraFields.description;
  }

  public toPOJO(): LinkPostInterface {
    return {
      id: this.id,
      linkURL: this.linkURL,
      description: this.description
    };
  }
}
