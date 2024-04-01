import { PostInterface } from './post/post.interface';
import { UserInterface } from './user/user.interface';

export interface CommentInterface {
  id: string;
  text: string;
  postId: PostInterface['id'];
  authorId: UserInterface['id'];
  date: string;
}
