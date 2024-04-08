import { Entity, PostTextInterface, StorableEntity } from '@project/shared/core';

export class PostTextEntity extends Entity implements PostTextInterface, StorableEntity<PostTextInterface> {
  public announce: string;
  public title: string;
  public text: string;

  constructor(post: PostTextInterface) {
    super()

    if(!post) {
      return;
    }

    this.title = post.title;
    this.announce = post.announce;
    this.text = post.text;
  }

  public toPOJO(): PostTextInterface {
    return {
      title: this.title,
      announce: this.announce,
      text: this.text,
    };
  }
}
