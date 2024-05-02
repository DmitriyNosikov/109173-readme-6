import { ApiProperty } from '@nestjs/swagger';
import { BlogPostValidation } from '@project/blog-post';
import { UserInterface } from '@project/shared/core';
import { IsMongoId, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDTO {
  @ApiProperty({
    description: 'Comment author id',
    example: '6dd03634-9785-49b8-a403-9ab61bb5656e',
    required: true
  })
  @IsString()
  @IsMongoId()
  public authorId: UserInterface['id'];

  @ApiProperty({
    description: 'Comment text',
    example: 'Amazing post! I`m so excited about this!',
    minLength: BlogPostValidation.COMMENT.MIN_LENGTH,
    maxLength: BlogPostValidation.COMMENT.MAX_LENGTH,
    required: true
  })
  @MinLength(BlogPostValidation.COMMENT.MIN_LENGTH)
  @MaxLength(BlogPostValidation.COMMENT.MAX_LENGTH)
  @IsString()
  @IsNotEmpty()
  text: string;
}
