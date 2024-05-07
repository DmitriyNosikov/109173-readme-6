import { ApiProperty } from '@nestjs/swagger';
import { UserInterface } from '@project/shared/core';
import { IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { CommentValidation } from '../comment.constant';

export class UpdateCommentDTO {
  @ApiProperty({
    description: 'Comment author id',
    example: '6dd03634-9785-49b8-a403-9ab61bb5656e',
    required: true
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  public authorId?: UserInterface['id'];

  @ApiProperty({
    description: 'Comment text',
    example: 'Amazing post! I`m so excited about this!',
    minLength: CommentValidation.TEXT.MIN_LENGTH,
    maxLength: CommentValidation.TEXT.MAX_LENGTH,
  })
  @MinLength(CommentValidation.TEXT.MIN_LENGTH)
  @MaxLength(CommentValidation.TEXT.MAX_LENGTH)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  text?: string;
}
