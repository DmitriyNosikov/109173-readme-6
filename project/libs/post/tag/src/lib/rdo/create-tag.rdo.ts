import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateTagRDO {
  @Expose()
  @ApiProperty({ description: 'Tag ID' })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'Tag create date',
    example: '2024-05-06T13:40:46.649Z'
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'Tag update date',
    example: '2024-05-06T13:40:46.649Z'
  })
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    description: 'Tag name',
    example: 'tag1'
  })
  name: string;
}
