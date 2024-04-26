import { Expose } from 'class-transformer';
import { BasePostInterface, PostTypeEnum, UserInterface } from '@project/shared/core';

import { CreatePostLinkRDO } from './create-post-link.rdo';
import { CreatePostTextRDO } from './create-post-text.rdo';
import { CreatePostQuoteRDO } from './create-post-quote.rdo';
import { CreatePostPhotoRDO } from './create-post-photo.rdo';
import { CreatePostVideoRDO } from './create-post-video.rdo';
import { CreateAllPostRelationRDO } from './create-all-post-relation.rdo';

export type ExtraFieldsRDO = CreateBasePostRDO | CreatePostLinkRDO | CreatePostTextRDO | CreatePostQuoteRDO | CreatePostPhotoRDO | CreatePostVideoRDO;

export class CreateBasePostRDO {
  @Expose()
  public id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  public type: PostTypeEnum;

  // Будем получать в API Gateway (скорее всего)
  // @Expose()
  // public tags: string[] | null;

  // @Expose()
  // public comments: CommentInterface[] | null;

  // @Expose()
  // public likes: LikeInterface[] | null;

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
}

export class CreatedBasePostRDO {
  @Expose()
  public post: CreateBasePostRDO;

  @Expose()
  public postToExtraFields: CreateAllPostRelationRDO
}
