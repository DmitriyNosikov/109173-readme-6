import { Transform } from 'class-transformer';
import { IsIn, IsMongoId, IsNumber, IsOptional, IsString, Max } from 'class-validator';

import { PostTypeEnum, SortDirection, SortDirectionEnum, SortType, SortTypeEnum } from '@project/shared/core';

import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_SORT_TYPE,
  MAX_POSTS_PER_PAGE
} from '../../blog-post.constant';

export class GetPostsListQuery  {
  @IsString()
  @IsOptional()
  public type?: PostTypeEnum;

  @IsMongoId()
  @IsOptional()
  public authorId?: string;

  @IsString()
  @IsOptional()
  public tag?: string;

  @Transform(({ value }) => Number(value) || MAX_POSTS_PER_PAGE)
  @Max(MAX_POSTS_PER_PAGE)
  @IsNumber()
  @IsOptional()
  public limit?: number = MAX_POSTS_PER_PAGE;

  @IsIn(Object.values(SortType))
  @IsOptional()
  public sortType?: SortTypeEnum = DEFAULT_SORT_TYPE;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirectionEnum = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => Number(value) || DEFAULT_PAGE_NUMBER)
  @IsOptional()
  public page?: number = DEFAULT_PAGE_NUMBER;
}
