import { Expose } from 'class-transformer';

export class CreatePostPhotoRDO {
  @Expose()
  public id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  public photoURL: string;
}
