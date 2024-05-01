import { Expose } from 'class-transformer';
import { PostWithTextRDO } from './post-with-text.rdo';

export class CreateQuotePostRDO implements PostWithTextRDO {
  @Expose()
  public id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  public authorId: string;

  @Expose()
  public text: string;

}
