import { BasePostInterface } from '@project/shared/core';
import { Expose } from 'class-transformer';

export class CreatePostToExtraFieldsRDO {
  @Expose()
  public id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  public postId: BasePostInterface['id'];

  @Expose()
  public postType: BasePostInterface['type'];

  @Expose()
  public extraFieldsId: string;
}
