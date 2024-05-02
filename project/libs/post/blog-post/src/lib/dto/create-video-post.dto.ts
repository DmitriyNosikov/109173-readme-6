import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { PostWithTitleDTO } from './post-with-title.dto';
import { BlogPostValidation } from '../blog-post.constant';

export class CreateVideoPostDTO implements PostWithTitleDTO {
  @ApiProperty({
    description: 'Video title',
    example: 'Some video title',
    minLength: BlogPostValidation.TITLE.MIN_LENGTH,
    maxLength: BlogPostValidation.TITLE.MAX_LENGTH,
    required: true
  })
  @MinLength(BlogPostValidation.TITLE.MIN_LENGTH)
  @MaxLength(BlogPostValidation.TITLE.MAX_LENGTH)
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty({
    description: 'Valid youtube video link',
    example: 'https://www.youtube.com/live/jfKfPfyJRdk?si=IsxOl50arZoSKcOI',
    required: true
  })
  @IsUrl()
  @IsNotEmpty()
  public videoURL: string;
}
