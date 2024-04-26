import { Entity, PostQuoteInterface, StorableEntity } from '@project/shared/core';

export class PostQuoteEntity extends Entity implements PostQuoteInterface, StorableEntity<PostQuoteInterface> {
  public authorId: string;
  public text: string;

  constructor(extraFields: PostQuoteInterface) {
    super()

    if(!extraFields) {
      return;
    }

    this.id = extraFields.id ?? undefined;
    this.authorId = extraFields.authorId;
    this.text = extraFields.text;
  }

  public toPOJO(): PostQuoteInterface {
    return {
      id: this.id,
      authorId: this.authorId,
      text: this.text,
    };
  }
}
