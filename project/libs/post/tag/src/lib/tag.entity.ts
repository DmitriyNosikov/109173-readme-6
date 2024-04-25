import { Entity, TagInterface } from '@project/shared/core'

export class TagEntity extends Entity implements TagInterface{
  public createdAt?: Date;
  public updatedAt?: Date;

  public title: string;

  constructor(tag: TagInterface) {
    super();

    this.populate(tag);
  }

  public populate(tag: TagInterface) {
    this.id = tag.id;
    this.title = tag.title;
    this.createdAt = tag.createdAt;
    this.updatedAt = tag.updatedAt;
  }

  public toPOJO() {
    return {
      id: this.id,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
