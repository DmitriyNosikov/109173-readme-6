import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString, Max } from 'class-validator';

import { SortDirection, SortDirectionEnum, SortType, SortTypeEnum } from '@project/shared/core';

import { DEFAULT_PAGE_COUNT, DEFAULT_SORT_DIRECTION, DEFAULT_SORT_TYPE, MAX_SEARCH_POSTS_LIMIT } from './blog-post.constant';

export class BlogPostQuery {
  @IsString()
  @IsOptional()
  public title?: string;

  @Transform(({ value }) => Number(value) || MAX_SEARCH_POSTS_LIMIT)
  @Max(MAX_SEARCH_POSTS_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = MAX_SEARCH_POSTS_LIMIT;

  @IsIn(Object.values(SortType))
  @IsOptional()
  public sortType: SortTypeEnum = DEFAULT_SORT_TYPE;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirectionEnum = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => Number(value) || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;
}
