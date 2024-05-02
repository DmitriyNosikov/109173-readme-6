import { UserInterface } from '../user/user.interface';
import { PostTypeEnum } from '../../types/post/post-type.enum';
import { CommentInterface } from '../comment.interface';
import { LikeInterface } from '../like.interface';
import { CreatedUpdatedDatesInterface } from '../created-updated-dates.interface';
import { TagInterface } from '../tag.interface';
import { PostToExtraFieldsInterface } from './post-to-extra-fields.interface';

export interface BasePostInterface extends CreatedUpdatedDatesInterface{
  id?: string;
  publishedAt?: Date;

  type: PostTypeEnum;
  authorId: UserInterface['id'];
  isPublished: boolean;

  isRepost?: boolean;
  originAuthorId?: UserInterface['id'] | undefined;
  originPostId?: BasePostInterface['id'] | undefined;

  tags?: TagInterface[] | undefined;
  comments?: CommentInterface[] | undefined,
  likes?: LikeInterface[] | undefined,
  postToExtraFields?: PostToExtraFieldsInterface[] | undefined;
}
