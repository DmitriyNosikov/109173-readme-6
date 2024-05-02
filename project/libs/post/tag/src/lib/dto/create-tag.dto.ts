import { ApiProperty } from '@nestjs/swagger';
import { BlogPostValidation } from '@project/blog-post'
import { IsString, MaxLength, MinLength } from 'class-validator';
export class CreateTagDTO {
  @ApiProperty({
    type: [String],
    description: 'Tag name',
    example: 'tag1',
    minLength: BlogPostValidation.TAG.MIN_LENGTH,
    maxLength: BlogPostValidation.TAG.MAX_LENGTH,
  })
  @MinLength(BlogPostValidation.TAG.MIN_LENGTH)
  @MaxLength(BlogPostValidation.TAG.MAX_LENGTH)
  @IsString()
  name: string;
}
