import { PostInterface } from './post/post.interface';
import { UserInterface } from './user/user.interface';

export interface LikeInterface {
  id: string;
  postId: PostInterface['id'];
  authorId: UserInterface['id'];
}
