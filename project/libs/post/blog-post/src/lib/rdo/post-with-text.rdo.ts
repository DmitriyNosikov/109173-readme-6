import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PostWithTextRDO {
  @Expose()
  @ApiProperty({
    description: 'Post text',
    example: 'Full post text'
  })
  public text: string;
}
