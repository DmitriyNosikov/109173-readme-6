import { ApiProperty } from '@nestjs/swagger'
import { PostWithTextDTO } from './post-with-text.dto';
import { PostWithTitleDTO } from './post-with-title.dto';

export class CreateTextPostDTO implements PostWithTitleDTO, PostWithTextDTO {
  @ApiProperty({
    description: 'Text title',
    example: 'Some text title',
    minLength: 20,
    maxLength: 50,
    required: true
  })
  public title: string;

  @ApiProperty({
    description: 'Text announce',
    example: 'Little text presentation',
    minLength: 50,
    maxLength: 255,
    required: true
  })
  public announce: string;

  @ApiProperty({
    description: 'Post text',
    example: 'Full post text',
    minLength: 100,
    maxLength: 1024,
    required: true
  })
  public text: string;
}
