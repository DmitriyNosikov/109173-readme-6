import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PostWithTitleRDO {
  @Expose()
  @ApiProperty({
    description: 'Text title',
    example: 'Some text title'
  })
  public title: string;
}
