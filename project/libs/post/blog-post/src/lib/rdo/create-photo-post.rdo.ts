import { Expose } from 'class-transformer';

export class CreatePhotoPostRDO {
  @Expose()
  public id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  public photoURL: string;
}
