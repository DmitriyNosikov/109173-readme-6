import { Entity, QuotePostInterface, StorableEntity } from '@project/shared/core';

export class QuotePostEntity extends Entity implements QuotePostInterface, StorableEntity<QuotePostInterface> {
  public authorId: string;
  public text: string;

  constructor(extraFields: QuotePostInterface) {
    super()

    if(!extraFields) {
      return;
    }

    this.id = extraFields.id ?? undefined;
    this.authorId = extraFields.authorId;
    this.text = extraFields.text;
  }

  public toPOJO(): QuotePostInterface {
    return {
      id: this.id,
      authorId: this.authorId,
      text: this.text,
    };
  }
}
