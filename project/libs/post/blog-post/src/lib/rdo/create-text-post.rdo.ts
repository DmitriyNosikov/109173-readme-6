import { ApiProperty } from '@nestjs/swagger';
import { PostWithTextRDO } from './post-with-text.rdo';
import { PostWithTitleRDO } from './post-with-title.rdo';
import { Expose } from 'class-transformer';

export class CreateTextPostRDO implements PostWithTitleRDO, PostWithTextRDO {
  @Expose()
  @ApiProperty({
    description: 'Text post ID',
    example: '6dd03634-9785-49b8-a403-9ab61bb5656e'
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'Text title',
    example: 'Some text title'
  })
  public title: string;

  @Expose()
  @ApiProperty({
    description: 'Text announce',
    example: 'Little text presentation'
  })
  public announce: string;

  @Expose()
  @ApiProperty({
    description: 'Post text',
    example: 'Full post text'
  })
  public text: string;
}
