import { ApiProperty } from '@nestjs/swagger'
import { ArrayMaxSize, IsAlphanumeric, IsArray, IsBoolean, IsIn, IsMongoId, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { BasePostInterface, PostType, PostTypeEnum, UserInterface } from '@project/shared/core';
import { BlogPostValidation } from '../blog-post.constant';
import { postTypeList } from 'libs/shared/core/src/lib/types/post/post-type.enum';

import { CreateLinkPostDTO } from './create-link-post.dto';
import { CreateTextPostDTO } from './create-text-post.dto';
import { CreateQuotePostDTO } from './create-quote-post.dto';
import { CreatePhotoPostDTO } from './create-photo-post.dto';
import { CreateVideoPostDTO } from './create-video-post.dto';
import { CommentInterface } from '@project/post/comment';
import { LikeInterface } from '@project/post/like';
import { CreateCommentRDO } from 'libs/post/comment/src/lib/rdo/create-comment.rdo';


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
  @ArrayMaxSize(BlogPostValidation.TAG.MAX_СOUNT)
  @IsArray()
  @MinLength(BlogPostValidation.TAG.MIN_LENGTH, { each: true })
  @MaxLength(BlogPostValidation.TAG.MAX_LENGTH, { each: true })
  @IsAlphanumeric('en-US', { each: true })
  @Matches(new RegExp('^[a-zA-Zа-яА-Я]', 'gmi'), { each: true , message: 'each value in tags must starts with letter'})
  @IsString({ each: true })
  @IsOptional()
  public tags: string[] | null;

  @ApiProperty({
    description: 'Post comments id`s (can be undefined)',
    type: [CreateCommentRDO]
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public comments: CommentInterface[] | null;

  @ApiProperty({
    type: [String],
    description: 'Post likes id`s (can be undefined)',
    example: '[ "438734-gdjf9g843-gsmi43", "gsmi43-gdjf9g843-fg435gd" ]',
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
    description: 'Post author MongoDB id',
    example: '66224f68a3f9a165a1ab5fbd',
    required: true
  })
  @IsString()
  @IsMongoId()
  public authorId: UserInterface['id'];

  @ApiProperty({
    description: 'Original post author MongoDB id (when reposted)',
    example: '66224f68a3f9a165a1ab5fbd',
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
    enum: [CreateBasePostDTO, CreateLinkPostDTO, CreateTextPostDTO, CreateQuotePostDTO, CreatePhotoPostDTO, CreateVideoPostDTO],
    example: 'For text post: { "announce": "Some announce text", "title": "Article title", "text": "Long story short text" }'
  })
  @IsNotEmpty()
  public extraFields: ExtraFieldsDTO;
}
