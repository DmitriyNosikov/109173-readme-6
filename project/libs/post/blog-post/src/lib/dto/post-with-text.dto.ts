import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { BlogPostValidation } from '../blog-post.constant';

export class PostWithTextDTO {
  @ApiProperty({
    description: 'Post text',
    example: 'Full post text',
    minLength: BlogPostValidation.TEXT.MIN_LENGTH,
    maxLength: BlogPostValidation.TEXT.MAX_LENGTH,
    required: true
  })
  @MinLength(BlogPostValidation.TEXT.MIN_LENGTH)
  @MaxLength(BlogPostValidation.TEXT.MAX_LENGTH)
  @IsString()
  @IsNotEmpty()
  public text: string;
}
