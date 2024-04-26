import { EntityFactory, PhotoPostInterface } from '@project/shared/core';
import { PhotoPostEntity } from '../entities/photo-post.entity';

export class PhotoPostFactory implements EntityFactory<PhotoPostEntity> {
  public create(entityPlainData: PhotoPostInterface): PhotoPostEntity {
    return new PhotoPostEntity(entityPlainData);
  }
}
