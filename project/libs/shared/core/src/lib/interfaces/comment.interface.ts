import { BasePostInterface } from './post/base-post.interface';
import { UserInterface } from './user/user.interface';

export interface CommentInterface {
  id?: string;
  postId: BasePostInterface['id'];
  authorId: UserInterface['id'];
  text: string;
  createdAt: string;
  updatedAt: string;
}
