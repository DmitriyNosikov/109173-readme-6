import { Expose } from 'class-transformer';
import { PostWithTextRDO } from './post-with-text.rdo';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuotePostRDO implements PostWithTextRDO {
  @Expose()
  @ApiProperty({
    description: 'Quote post ID',
    example: '6dd03634-9785-49b8-a403-9ab61bb5656e'
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'Quote author MongoDB ID',
    example: '66224f68a3f9a165a1ab5fbd'
  })
  public authorId: string;

  @Expose()
  @ApiProperty({
    description: 'Quote text',
    example: 'Some quote text'
  })
  public text: string;

}
