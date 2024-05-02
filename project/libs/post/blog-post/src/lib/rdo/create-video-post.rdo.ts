import { Expose } from 'class-transformer';
import { PostWithTitleRDO } from './post-with-title.rdo';

export class CreateVideoPostRDO implements PostWithTitleRDO {
  @Expose()
  public id?: string;

  @Expose()
  public title: string;

  @Expose()
  public videoURL: string;
}
