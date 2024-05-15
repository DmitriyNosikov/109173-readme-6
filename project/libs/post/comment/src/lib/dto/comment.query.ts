import { Expose, Transform } from 'class-transformer';
import { CommentValidation } from '../comment.constant';
import { IsNumber, IsOptional, IsString, Max } from 'class-validator';


export class CommentQuery {
  @Expose()
  @IsString()
  @IsOptional()
  public postId?: string;

  @Expose()
  @Transform(({ value }) => Number(value) || CommentValidation.MAX_COMMENTS_PER_PAGE)
  @Max(CommentValidation.MAX_COMMENTS_PER_PAGE)
  @IsNumber()
  @IsOptional()
  public limit?: number = CommentValidation.MAX_COMMENTS_PER_PAGE;


  @Expose()
  @Transform(({ value }) => Number(value) || CommentValidation.DEFAULT_PAGE_NUMBER)
  @IsOptional()
  public page?: number = CommentValidation.DEFAULT_PAGE_NUMBER;
}
