import { Expose } from 'class-transformer';
import { BasePostInterface, PostTypeEnum, UserInterface } from '@project/shared/core';

import { CreateLinkPostRDO } from './create-link-post.rdo';
import { CreateTextPostRDO } from './create-text-post.rdo';
import { CreateQuotePostRDO } from './create-quote-post.rdo';
import { CreatePhotoPostRDO } from './create-photo-post.rdo';
import { CreateVideoPostRDO } from './create-video-post.rdo';
import { CreatePostToExtraFieldsRDO } from './create-post-to-extra-fields.rdo';

export type ExtraFieldsRDO = CreateBasePostRDO | CreateLinkPostRDO | CreateTextPostRDO | CreateQuotePostRDO | CreatePhotoPostRDO | CreateVideoPostRDO;

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

export class CreatedBlogPostRDO {
  @Expose()
  public post: CreateBasePostRDO;

  @Expose()
  public postToExtraFields: CreatePostToExtraFieldsRDO
}
