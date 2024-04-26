import { Entity, StorableEntity, TextPostInterface } from '@project/shared/core';

export class TextPostEntity extends Entity implements TextPostInterface, StorableEntity<TextPostInterface> {
  public announce: string;
  public title: string;
  public text: string;

  constructor(extraFields: TextPostInterface) {
    super()

    if(!extraFields) {
      return;
    }

    this.id =  extraFields.id ?? undefined;
    this.title = extraFields.title;
    this.announce = extraFields.announce;
    this.text = extraFields.text;
  }

  public toPOJO(): TextPostInterface {
    return {
      id: this.id,
      title: this.title,
      announce: this.announce,
      text: this.text,
    };
  }
}
