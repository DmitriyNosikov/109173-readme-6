import { Expose, Type } from 'class-transformer';
import { BasePostWithExtraFieldsRDO } from './base-post-with-extra-fields';
import { ApiProperty } from '@nestjs/swagger';

export class BasePostWithPaginationRDO {
  @Expose()
  @ApiProperty({
    description: 'Post entities array',
    type: BasePostWithExtraFieldsRDO,
  })
  @Type(() => BasePostWithExtraFieldsRDO)
  public entities: BasePostWithExtraFieldsRDO[];

  @Expose()
  @ApiProperty({
    description: 'Paginated post pages count',
    example: 2
  })
  public totalPages: number;

  @Expose()
  @ApiProperty({
    description: 'Total posts count',
    example: 81
  })
  public totalItems: number;

  @Expose()
  @ApiProperty({
    description: 'Current page number in pagination',
    example: 1
  })
  public currentPage: number;

  @Expose()
  @ApiProperty({
    description: 'Posts per page',
    example: 25
  })
  public itemsPerPage: number;
}
