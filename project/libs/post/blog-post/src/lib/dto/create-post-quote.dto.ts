import { ApiProperty } from '@nestjs/swagger'
import { PostWithTextDTO } from './post-with-text.dto';

export class CreatePostQuoteDTO implements PostWithTextDTO {
  @ApiProperty({
    description: 'Quote author id',
    example: '6dd03634-9785-49b8-a403-9ab61bb5656e',
    minLength: 3,
    maxLength: 50,
    required: true
  })
  public authorId: string;

  @ApiProperty({
    description: 'Quote text',
    example: 'Some quote text',
    minLength: 20,
    maxLength:  300,
    required: true
  })
  public text: string;

}
