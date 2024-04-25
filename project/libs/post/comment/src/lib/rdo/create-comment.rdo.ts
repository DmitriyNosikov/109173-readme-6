import { UserInterface } from '@project/shared/core';
import { Expose } from 'class-transformer';

export class CreateCommentRDO {
  @Expose()
  id: string;

  @Expose()
  authorId: UserInterface['id'];

  @Expose()
  text: string;
}
