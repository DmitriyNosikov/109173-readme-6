import { EntityFactory, VideoPostInterface } from '@project/shared/core';
import { VideoPostEntity } from '../entities/video-post.entity';

export class VideoPostFactory implements EntityFactory<VideoPostEntity> {
  public create(entityPlainData: VideoPostInterface): VideoPostEntity {
    return new VideoPostEntity(entityPlainData);
  }
}
