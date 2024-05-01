import { Expose } from 'class-transformer';

export class PostWithTitleRDO {
  @Expose()
  public title: string;
}
