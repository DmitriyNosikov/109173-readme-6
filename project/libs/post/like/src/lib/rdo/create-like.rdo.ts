import { BasePostInterface, UserInterface } from '@project/shared/core';
import { Expose } from 'class-transformer';

export class CreateLikeRDO {
  @Expose()
  id: string;

  @Expose()
  postId: BasePostInterface['id'];

  @Expose()
  authorId: UserInterface['id'];
}
