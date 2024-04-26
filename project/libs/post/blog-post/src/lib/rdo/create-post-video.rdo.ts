import { Expose } from 'class-transformer';
import { PostWithTitleRDO } from './post-with-title.rdo';

export class CreatePostVideoRDO implements PostWithTitleRDO {
  @Expose()
  public id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  public title: string;

  @Expose()
  public videoURL: string;
}