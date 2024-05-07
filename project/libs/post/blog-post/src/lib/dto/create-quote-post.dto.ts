import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { PostWithTextDTO } from './post-with-text.dto';
import { BlogPostValidation } from '../blog-post.constant';

export class CreateQuotePostDTO implements PostWithTextDTO {
  @ApiProperty({
    description: 'Quote author MongoDB id',
    example: '66224f68a3f9a165a1ab5fbd',
    minLength: BlogPostValidation.QUOTE_AUTHOR.MIN_LENGTH,
    maxLength: BlogPostValidation.QUOTE_AUTHOR.MAX_LENGTH,
    required: true
  })
  @MinLength(BlogPostValidation.QUOTE_AUTHOR.MIN_LENGTH)
  @MaxLength(BlogPostValidation.QUOTE_AUTHOR.MAX_LENGTH)
  @IsString()
  @IsMongoId()
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
  @IsNotEmpty()
  public text: string;

}
