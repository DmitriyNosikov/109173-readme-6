import { CreatedUpdatedDatesInterface } from './created-updated-dates.interface';
import { BasePostInterface } from './post/base-post.interface';
import { UserInterface } from './user/user.interface';

export interface LikeInterface extends CreatedUpdatedDatesInterface{
  id?: string;

  postId: BasePostInterface['id'];
  authorId: UserInterface['id'];
}
