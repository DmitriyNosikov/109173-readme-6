import { BasePostInterface, CreatedUpdatedDatesInterface, UserInterface } from '@project/shared/core';

export interface CommentInterface extends CreatedUpdatedDatesInterface {
  id?: string;
  postId: BasePostInterface['id'];
  authorId: UserInterface['id'];
  text: string;
}
