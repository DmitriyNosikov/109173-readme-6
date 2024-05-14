import { Expose, Type } from 'class-transformer';
import { BasePostInterface, PostTypeEnum, UserInterface } from '@project/shared/core';

import { CreateTextPostRDO } from './create-text-post.rdo';
import { CreateQuotePostRDO } from './create-quote-post.rdo';
import { CreateLinkPostRDO } from './create-link-post.rdo';
import { CreatePhotoPostRDO } from './create-photo-post.rdo';
import { CreateVideoPostRDO } from './create-video-post.rdo';
import { CreateTagRDO } from 'libs/post/tag/src/lib/rdo/create-tag.rdo';
import { CreateCommentRDO } from 'libs/post/comment/src/lib/rdo/create-comment.rdo';
import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@prisma/client';
import { CreateLikeRDO } from 'libs/post/like/src/lib/rdo/create-like.rdo';

export type ExtraFieldsRDO = CreateTextPostRDO | CreateQuotePostRDO | CreateLinkPostRDO | CreatePhotoPostRDO | CreateVideoPostRDO;

export class BasePostWithExtraFieldsRDO {
  @Expose()
  @ApiProperty({
    description: 'Post ID',
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6'
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'Post create date',
    example: '2024-05-06T13:40:46.649Z'
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'Post update date',
    example: '2024-05-06T13:40:46.649Z'
  })
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    description: 'Post publish date',
    example: '2024-05-06T13:40:46.649Z'
  })
  publishedAt?: Date;

  @Expose()
  @ApiProperty({
    description: 'Post type',
    enum: PostType,
    example: 'text'
  })
  public type: PostTypeEnum;

  @Expose()
  @ApiProperty({
    description: 'Post published or not',
    example: true
  })
  public isPublished: boolean;

  @Expose()
  @ApiProperty({
    description: 'Post Author MongoDB ID',
    example: '66224f68a3f9a165a1ab5fbd'
  })
  public authorId: UserInterface['id'];

  // Будем получать в API Gateway (скорее всего)
  @Expose()
  @ApiProperty({
    description: 'Post tag entities array',
    type: [CreateTagRDO]
  })
  @Type(() => CreateTagRDO)
  public tags: CreateTagRDO[] | null;

  @Expose()
  @ApiProperty({
    description: 'Post comment entities array',
    type: [CreateCommentRDO]
  })
  @Type(() => CreateCommentRDO)
  public comments: CreateCommentRDO[] | null;

  @Expose()
  @ApiProperty({
    description: 'Post likes ids array',
    type: [CreateLikeRDO]
  })
  public likes?: CreateLikeRDO[] | null;

  @Expose()
  @ApiProperty({
    description: 'Repost flag',
    example: false
  })
  public isRepost: boolean;

  @Expose()
  @ApiProperty({
    description: 'If it is repost - Original post author MongoDB ID',
    example: '66224f68a3f9a165a1ab5fbd'
  })
  public originAuthorId: UserInterface['id'] | null;

  @Expose()
  @ApiProperty({
    description: 'If it is repost - Original post ID',
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6'
  })
  public originPostId: BasePostInterface['id'] | null;

  @Expose()
  @ApiProperty({
    description: 'Post extra fields, connected with post type',
    enum: [CreateTextPostRDO, CreateQuotePostRDO, CreateLinkPostRDO, CreatePhotoPostRDO, CreateVideoPostRDO]
  })
  public extraFields: ExtraFieldsRDO[]

  @Expose()
  @ApiProperty({
    description: 'Post likes count',
    example: 0
  })
  public likesCount: number;

  @Expose()
  @ApiProperty({
    description: 'Post comments count',
    example: 3
  })
  public commentsCount: number;
}
