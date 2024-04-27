import { UserInterface } from '../user/user.interface';
import { PostTypeEnum } from '../../types/post/post-type.enum';
import { CommentInterface } from '../comment.interface';
import { LikeInterface } from '../like.interface';
import { CreatedUpdatedDatesInterface } from '../created-updated-dates.interface';

export interface BasePostInterface extends CreatedUpdatedDatesInterface{
  id?: string;
  publishedAt?: Date;

  type: PostTypeEnum;
  isPublished: boolean;
  isRepost: boolean;
  authorId: UserInterface['id'];
  originAuthorId: UserInterface['id'] | null;
  originPostId: BasePostInterface['id'] | null;

  tags?: string[] | null;
  comments?: CommentInterface[] | null,
  likes?: LikeInterface[] | null,
}
