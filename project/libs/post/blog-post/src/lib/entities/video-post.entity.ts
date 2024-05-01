import { Entity, StorableEntity, VideoPostInterface } from '@project/shared/core';

export class VideoPostEntity extends Entity implements VideoPostInterface, StorableEntity<VideoPostInterface> {
  public title: string;
  public videoURL: string;

  constructor(extraFields: VideoPostInterface) {
    super()

    if(!extraFields) {
      return;
    }

    this.id = extraFields.id ?? undefined;
    this.title = extraFields.title;
    this.videoURL = extraFields.videoURL;
  }

  public toPOJO(): VideoPostInterface {
    return {
      id: this.id,
      title: this.title,
      videoURL: this.videoURL,
    };
  }
}
