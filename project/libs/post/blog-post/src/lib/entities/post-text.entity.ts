import { Entity, PostTextInterface, StorableEntity } from '@project/shared/core';

export class PostTextEntity extends Entity implements PostTextInterface, StorableEntity<PostTextInterface> {
  public announce: string;
  public title: string;
  public text: string;

  constructor(extraFields: PostTextInterface) {
    super()

    if(!extraFields) {
      return;
    }

    this.id =  extraFields.id ?? undefined;
    this.title = extraFields.title;
    this.announce = extraFields.announce;
    this.text = extraFields.text;
  }

  public toPOJO(): PostTextInterface {
    return {
      id: this.id,
      title: this.title,
      announce: this.announce,
      text: this.text,
    };
  }
}
