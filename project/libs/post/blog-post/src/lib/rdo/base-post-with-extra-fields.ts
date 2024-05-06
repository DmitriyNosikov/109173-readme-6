import { Expose, Type } from 'class-transformer';
import { BasePostInterface, PostTypeEnum, UserInterface } from '@project/shared/core';
import { LikeInterface } from '@project/post/like';

import { CreateTextPostRDO } from './create-text-post.rdo';
import { CreateQuotePostRDO } from './create-quote-post.rdo';
import { CreateLinkPostRDO } from './create-link-post.rdo';
import { CreatePhotoPostRDO } from './create-photo-post.rdo';
import { CreateVideoPostRDO } from './create-video-post.rdo';
import { CreateTagRDO } from 'libs/post/tag/src/lib/rdo/create-tag.rdo';
import { CreateCommentRDO } from 'libs/post/comment/src/lib/rdo/create-comment.rdo';

export type ExtraFieldsRDO = CreateTextPostRDO | CreateQuotePostRDO | CreateLinkPostRDO | CreatePhotoPostRDO | CreateVideoPostRDO;

export class BasePostWithExtraFieldsRDO {
  @Expose()
  public id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  publishedAt?: Date;

  @Expose()
  public type: PostTypeEnum;

  @Expose()
  public isPublished: boolean;

  @Expose()
  public authorId: UserInterface['id'];

  // Будем получать в API Gateway (скорее всего)
  @Expose()
  @Type(() => CreateTagRDO)
  public tags: CreateTagRDO[] | null;

  @Expose()
  @Type(() => CreateCommentRDO)
  public comments: CreateCommentRDO[] | null;

  @Expose()
  public likes?: LikeInterface[] | null;

  @Expose()
  public isRepost: boolean;

  @Expose()
  public originAuthorId: UserInterface['id'] | null;

  @Expose()
  public originPostId: BasePostInterface['id'] | null;

  @Expose()
  public extraFields: ExtraFieldsRDO[]

  // PostToExtraFields - это чисто техническая
  // таблица и пользователю она не нужна
  // @Expose()
  // @Type(() => CreatePostToExtraFieldsRDO)
  // public postToExtraFields: CreatePostToExtraFieldsRDO[]
}
