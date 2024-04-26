import { Expose } from 'class-transformer';

export class PostWithTextRDO {
  @Expose()
  public text: string;
}
