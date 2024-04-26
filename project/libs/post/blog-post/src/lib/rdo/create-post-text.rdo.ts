import { PostWithTextRDO } from './post-with-text.rdo';
import { PostWithTitleRDO } from './post-with-title.rdo';
import { Expose } from 'class-transformer';

export class CreatePostTextRDO implements PostWithTitleRDO, PostWithTextRDO {
  @Expose()
  public id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  public title: string;

  @Expose()
  public announce: string;

  @Expose()
  public text: string;
}
