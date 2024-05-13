import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max } from 'class-validator';


import {
  BlogPostMessage,

  MAX_SEARCH_POSTS_LIMIT
} from '../../blog-post.constant';

export class SearchPostsQuery {
  @IsString()
  public title?: string;

  @Transform(({ value }) => Number(value) || MAX_SEARCH_POSTS_LIMIT)
  @Max(MAX_SEARCH_POSTS_LIMIT, { message: BlogPostMessage.ERROR.SEARCH_POSTS_LIMIT })
  @IsNumber()
  @IsOptional()
  public limit?: number = MAX_SEARCH_POSTS_LIMIT;
}
