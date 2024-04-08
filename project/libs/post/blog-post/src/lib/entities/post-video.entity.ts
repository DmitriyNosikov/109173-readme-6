import { Entity, PostVideoInterface, StorableEntity } from '@project/shared/core';
export class PostVideoEntity extends Entity implements PostVideoInterface, StorableEntity<PostVideoInterface> {
  public title: string;
  public videoURL: string;

  constructor(post: PostVideoInterface) {
    super()

    if(!post) {
      return;
    }

    this.title = post.title;
    this.videoURL = post.videoURL;
  }

  public toPOJO(): PostVideoInterface {
    return {
      title: this.title,
      videoURL: this.videoURL,
    };
  }
}
