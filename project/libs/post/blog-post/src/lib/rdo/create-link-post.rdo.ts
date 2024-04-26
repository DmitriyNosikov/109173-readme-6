import { Expose } from 'class-transformer';

export class CreateLinkPostRDO {
  @Expose()
  public id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  public linkURL: string;

  @Expose()
  public description: string;
}
