import { Expose } from 'class-transformer';
import { BasePostInterface, CommentInterface, LikeInterface, PostTypeEnum, TagInterface, UserInterface } from '@project/shared/core';
import { CreatePostToExtraFieldsRDO } from './create-post-to-extra-fields.rdo';

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
  public tags?: TagInterface[] | null;

  @Expose()
  public comments?: CommentInterface[] | null;

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
  public postToExtraFields: CreatePostToExtraFieldsRDO
}
