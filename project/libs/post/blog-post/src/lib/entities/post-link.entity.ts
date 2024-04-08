import { Entity, PostLinkInterface, StorableEntity } from '@project/shared/core';

export class PostLinkEntity extends Entity implements PostLinkInterface, StorableEntity<PostLinkInterface> {
  public linkURL: string;
  public description: string;

  constructor(post: PostLinkInterface) {
    super()

    if(!post) {
      return;
    }

    this.linkURL = post.linkURL;
    this.description = post.description;
  }

  public toPOJO(): PostLinkInterface {
    return {
      linkURL: this.linkURL,
      description: this.description
    };
  }
}
