import { PostWithTextRDO } from './post-with-text.rdo';
import { PostWithTitleRDO } from './post-with-title.rdo';
import { Expose } from 'class-transformer';

export class CreateTextPostRDO implements PostWithTitleRDO, PostWithTextRDO {
  @Expose()
  public id?: string;

  @Expose()
  public title: string;

  @Expose()
  public announce: string;

  @Expose()
  public text: string;
}
