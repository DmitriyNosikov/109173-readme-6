import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { BlogPostValidation } from '../blog-post.constant';

export class PostWithTitleDTO {
  @ApiProperty({
    description: 'Text title',
    example: 'Some text title',
    minLength: BlogPostValidation.TITLE.MIN_LENGTH,
    maxLength: BlogPostValidation.TITLE.MAX_LENGTH,
    required: true
  })
  @MinLength(BlogPostValidation.TITLE.MIN_LENGTH)
  @MaxLength(BlogPostValidation.TITLE.MAX_LENGTH)
  @IsString()
  public title: string;
}
