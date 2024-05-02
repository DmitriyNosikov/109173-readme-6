import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength, MinLength } from 'class-validator';
import { PostWithTextDTO } from './post-with-text.dto';
import { BlogPostValidation } from '../blog-post.constant';

export class CreateQuotePostDTO implements PostWithTextDTO {
  @ApiProperty({
    description: 'Quote author id',
    example: '6dd03634-9785-49b8-a403-9ab61bb5656e',
    minLength: BlogPostValidation.QUOTE_AUTHOR.MIN_LENGTH,
    maxLength: BlogPostValidation.QUOTE_AUTHOR.MAX_LENGTH,
    required: true
  })
  @MinLength(BlogPostValidation.QUOTE_AUTHOR.MIN_LENGTH)
  @MaxLength(BlogPostValidation.QUOTE_AUTHOR.MAX_LENGTH)
  @IsString()
  public authorId: string;

  @ApiProperty({
    description: 'Quote text',
    example: 'Some quote text',
    minLength: BlogPostValidation.QUOTE_TEXT.MIN_LENGTH,
    maxLength:  BlogPostValidation.QUOTE_TEXT.MAX_LENGTH,
    required: true
  })
  @MinLength(BlogPostValidation.QUOTE_TEXT.MIN_LENGTH)
  @MaxLength(BlogPostValidation.QUOTE_TEXT.MAX_LENGTH)
  @IsString()
  public text: string;

}
