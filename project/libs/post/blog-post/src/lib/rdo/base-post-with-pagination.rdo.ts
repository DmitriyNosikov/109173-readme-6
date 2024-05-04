import { Expose, Type } from 'class-transformer';
import { BasePostWithExtraFieldsRDO } from './base-post-with-extra-fields';

export class BasePostWithPaginationRdo {
  @Expose()
  @Type(() => BasePostWithExtraFieldsRDO)
  public entities: BasePostWithExtraFieldsRDO[];

  @Expose()
  public totalPages: number;

  @Expose()
  public totalItems: number;

  @Expose()
  public currentPage: number;

  @Expose()
  public itemsPerPage: number;
}
