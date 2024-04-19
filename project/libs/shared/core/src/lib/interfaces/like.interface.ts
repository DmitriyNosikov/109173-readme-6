import { BasePostInterface } from './post/base-post.interface';
import { UserInterface } from './user/user.interface';

export interface LikeInterface {
  id: string;
  postId: BasePostInterface['id'];
  authorId: UserInterface['id'];
  createdAt: string;
  updatedAt: string;
}
