import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength, MinLength } from 'class-validator';
import { PostWithTextDTO } from './post-with-text.dto';
import { PostWithTitleDTO } from './post-with-title.dto';
import { BlogPostValidation } from '../blog-post.constant';

export class CreateTextPostDTO implements PostWithTitleDTO, PostWithTextDTO {
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

  @ApiProperty({
    description: 'Text announce',
    example: 'Little text presentation',
    minLength: BlogPostValidation.ANNOUNCE.MIN_LENGTH,
    maxLength: BlogPostValidation.ANNOUNCE.MAX_LENGTH,
    required: true
  })
  @MinLength(BlogPostValidation.ANNOUNCE.MIN_LENGTH)
  @MaxLength(BlogPostValidation.ANNOUNCE.MAX_LENGTH)
  @IsString()
  public announce: string;

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
  public text: string;
}
