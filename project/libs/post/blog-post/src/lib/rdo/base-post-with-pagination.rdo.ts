import { Expose } from 'class-transformer';
import { CreateBasePostRDO } from './create-base-post.rdo';

export class BasePostWithPaginationRdo {
  @Expose()
  public entities: CreateBasePostRDO[];

  @Expose()
  public totalPages: number;

  @Expose()
  public totalItems: number;

  @Expose()
  public currentPage: number;

  @Expose()
  public itemsPerPage: number;
}
