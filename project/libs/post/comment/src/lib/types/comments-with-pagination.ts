import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCommentRDO } from '../rdo/create-comment.rdo';

export class CommentsWithPaginationRDO {
  @Expose()
  @ApiProperty({
    description: 'Comments entities array',
    type: CreateCommentRDO,
  })
  @Type(() => CreateCommentRDO)
  public entities: CreateCommentRDO[];

  @Expose()
  @ApiProperty({
    description: 'Paginated comments pages count',
    example: 2
  })
  public totalPages: number;

  @Expose()
  @ApiProperty({
    description: 'Total comments count',
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
    description: 'comments per page',
    example: 50
  })
  public itemsPerPage: number;
}
