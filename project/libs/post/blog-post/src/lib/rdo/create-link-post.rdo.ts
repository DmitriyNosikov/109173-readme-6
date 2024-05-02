import { Expose } from 'class-transformer';

export class CreateLinkPostRDO {
  @Expose()
  public id: string;

  @Expose()
  public linkURL: string;

  @Expose()
  public description: string;
}
