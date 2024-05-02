import { Expose, Type } from 'class-transformer';
import { BasePostInterface, LikeInterface, PostTypeEnum, UserInterface } from '@project/shared/core';
import { CreatePostToExtraFieldsRDO } from './create-post-to-extra-fields.rdo';
import { CreateTagRDO } from 'libs/post/tag/src/lib/rdo/create-tag.rdo';
import { CreateCommentRDO } from 'libs/post/comment/src/lib/rdo/create-comment.rdo';

export class GetPostRDO {
  @Expose()
  public id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  public type: PostTypeEnum;

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
  @Type(() => CreatePostToExtraFieldsRDO)
  public postToExtraFields: CreatePostToExtraFieldsRDO[]
}
