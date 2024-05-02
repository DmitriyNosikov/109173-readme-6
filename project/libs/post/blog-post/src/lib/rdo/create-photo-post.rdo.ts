import { Expose } from 'class-transformer';

export class CreatePhotoPostRDO {
  @Expose()
  public id?: string;

  @Expose()
  public photoURL: string;
}
