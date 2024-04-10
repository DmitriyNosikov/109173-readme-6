import { Entity, PostVideoInterface, StorableEntity } from '@project/shared/core';
export class PostVideoEntity extends Entity implements PostVideoInterface, StorableEntity<PostVideoInterface> {
  public title: string;
  public videoURL: string;

  constructor(extraFields: PostVideoInterface) {
    super()

    if(!extraFields) {
      return;
    }

    this.title = extraFields.title;
    this.videoURL = extraFields.videoURL;
  }

  public toPOJO(): PostVideoInterface {
    return {
      title: this.title,
      videoURL: this.videoURL,
    };
  }
}
