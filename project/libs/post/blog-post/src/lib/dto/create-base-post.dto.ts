import { ApiProperty } from '@nestjs/swagger'
import { ArrayMaxSize, IsArray, IsBoolean, IsIn, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { BasePostInterface, LikeInterface, PostType, PostTypeEnum, UserInterface } from '@project/shared/core';
import { BlogPostValidation } from '../blog-post.constant';
import { postTypeList } from 'libs/shared/core/src/lib/types/post/post-type.enum';

import { CreateLinkPostDTO } from './create-link-post.dto';
import { CreateTextPostDTO } from './create-text-post.dto';
import { CreateQuotePostDTO } from './create-quote-post.dto';
import { CreatePhotoPostDTO } from './create-photo-post.dto';
import { CreateVideoPostDTO } from './create-video-post.dto';
import { CommentInterface } from '@project/shared/core'


export type ExtraFieldsDTO = CreateBasePostDTO | CreateLinkPostDTO | CreateTextPostDTO | CreateQuotePostDTO | CreatePhotoPostDTO | CreateVideoPostDTO;

export class CreateBasePostDTO {
  @ApiProperty({
    description: 'Post type',
    enum: PostType,
    example: 'text',
    required: true
  })
  @IsIn(postTypeList)
  @IsString()
  @IsNotEmpty()
  public type: PostTypeEnum;

  @ApiProperty({
    type: [String],
    description: 'Post tags (names)',
    example: '[ "tag1", "tag2", "tag3" ]',
    minLength: BlogPostValidation.TAG.MIN_LENGTH,
    maxLength: BlogPostValidation.TAG.MAX_LENGTH,
    maxProperties: BlogPostValidation.TAG.MAX_СOUNT
  })
  @MinLength(BlogPostValidation.TAG.MIN_LENGTH, { each: true })
  @MaxLength(BlogPostValidation.TAG.MAX_LENGTH, { each: true })
  @ArrayMaxSize(BlogPostValidation.TAG.MAX_СOUNT)
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public tags: string[] | null;

  @ApiProperty({
    type: [String],
    description: 'Post comments',
    example: '[ { id: "438734-gdjf9g843-gsmi43", authorId: "gh8394g8h9efgh39434g", text: "Some comment text" } ]',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public comments: CommentInterface[] | null;

  @ApiProperty({
    type: [String],
    description: 'Post tags',
    example: '[ { id: "438734-gdjf9g843-gsmi43", authorId: "gh8394g8h9efgh39434g" } ]',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public likes: LikeInterface[] | null;

  @ApiProperty({
    description: 'Is post published flag',
    example: 'true',
    default: false
  })
  @IsBoolean()
  @IsNotEmpty()
  public isPublished: boolean;

  @ApiProperty({
    description: 'Is repost flag',
    example: 'false',
    default: false
  })
  @IsBoolean()
  @IsOptional()
  public isRepost: boolean;

  @ApiProperty({
    description: 'Post author id',
    example: '6dd03634-9785-49b8-a403-9ab61bb5656e',
    required: true
  })
  @IsString()
  @IsMongoId()
  public authorId: UserInterface['id'];

  @ApiProperty({
    description: 'Original post author id (when reposted)',
    example: '6dd03634-9785-49b8-a403-9ab61bb5656e',
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  public originAuthorId: UserInterface['id'] | null;


  @ApiProperty({
    description: 'Original post id (when reposted)',
    example: '6dd03634-9785-49b8-a403-9ab61bb5656e',
  })
  @IsString()
  @IsOptional()
  public originPostId: BasePostInterface['id'] | null;

  @ApiProperty({
    description: 'Extra-fields, specific for each post type (text, link, quote etc.)',
    example: '{ "announce": "Some announce text", "title": "Article title", "text": "Long story short text" }'
  })
  @IsNotEmpty()
  public extraFields: ExtraFieldsDTO;
}