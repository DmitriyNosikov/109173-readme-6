import { BasePostInterface, CreatedUpdatedDatesInterface, UserInterface } from '@project/shared/core';


export interface LikeInterface extends CreatedUpdatedDatesInterface{
  id?: string;
  postId: BasePostInterface['id'];
  authorId: UserInterface['id'];
}
