import { UserInterface } from '../user/user.interface';
import { PostTypeEnum } from './post-type.enum';

export interface PostInterface {
  id: string;
  type: PostTypeEnum;
  tags: string[];
  publishedAt: string;
  createdAt: string;
  isPublished: boolean;
  isRepost: boolean;
  authorId: UserInterface['id'];
  originAuthorId: UserInterface['id'] | null;
  originPostId: PostInterface['id'] | null;
}
