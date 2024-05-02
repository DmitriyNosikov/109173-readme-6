import { Expose, Type } from 'class-transformer';
import { PostTypeEnum, BasePostInterface, LikeInterface, UserInterface } from '@project/shared/core';

import { CreateTextPostRDO } from './create-text-post.rdo';
import { CreateQuotePostRDO } from './create-quote-post.rdo';
import { CreateLinkPostRDO } from './create-link-post.rdo';
import { CreatePhotoPostRDO } from './create-photo-post.rdo';
import { CreateVideoPostRDO } from './create-video-post.rdo';
import { CreateCommentRDO } from 'libs/post/comment/src/lib/rdo/create-comment.rdo';
import { CreateTagRDO } from 'libs/post/tag/src/lib/rdo/create-tag.rdo';

export type ExtraFieldsRDO = CreateTextPostRDO | CreateQuotePostRDO | CreateLinkPostRDO | CreatePhotoPostRDO | CreateVideoPostRDO;

export class CreateBasePostRDO {
  @Expose()
  public id: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;

  @Expose()
  publishedAt?: Date;

  @Expose()
  public type: PostTypeEnum;

  @Expose()
  public isPublished: boolean;

  @Expose()
  public isRepost: boolean;

  @Expose()
  public authorId: UserInterface['id'];

  @Expose()
  public originAuthorId: UserInterface['id'] | null;

  @Expose()
  public originPostId: BasePostInterface['id'] | null;

  @Expose()
  @Type(() => CreateTagRDO)
  public tags: CreateTagRDO[] | null;

  @Expose()
  public likes: LikeInterface[] | null;

  @Expose()
  @Type(() => CreateCommentRDO)
  public comments: CreateCommentRDO[] | null;
}

export class CreatePostRDO extends CreateBasePostRDO {
  @Expose()
  public extraFields: ExtraFieldsRDO | null;
}
