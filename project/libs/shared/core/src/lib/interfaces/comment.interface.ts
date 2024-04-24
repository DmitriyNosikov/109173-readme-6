import { CreatedUpdatedDatesInterface } from './created-updated-dates.interface';
import { UserInterface } from './user/user.interface';

export interface CommentInterface extends CreatedUpdatedDatesInterface {
  id?: string;
  authorId: UserInterface['id'];
  text: string;
}
