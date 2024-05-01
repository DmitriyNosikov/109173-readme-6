import { UserInterface } from '@project/shared/core';
import { Expose } from 'class-transformer';

export class CreateCommentRDO {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  authorId: UserInterface['id'];

  @Expose()
  text: string;
}
