import { UserInterface } from '../user/user.interface';
import { PostTypeEnum } from '../../types/post/post-type.enum';
import { PostLinkInterface } from './post-link.interface';
import { PostTextInterface } from './post-text.interface';
import { PostQuoteInterface } from './post-quote.interface';
import { PostPhotoInterface } from './post-photo.interface';
import { PostVideoInterface } from './post-video.interface';
import { TagInterface } from '../tag.interface';
import { CommentInterface } from '../comment.interface';
import { LikeInterface } from '../like.interface';
import { CreatedUpdatedDatesInterface } from '../created-updated-dates.interface';

export type ExtraFields = PostLinkInterface | PostTextInterface | PostQuoteInterface | PostPhotoInterface | PostVideoInterface;

export interface BasePostInterface extends CreatedUpdatedDatesInterface{
  id?: string;
  publishedAt?: string;

  type: PostTypeEnum;
  tags?: TagInterface[] | null;
  comments?: CommentInterface[] | null,
  likes?: LikeInterface[] | null,
  isPublished: boolean;
  isRepost: boolean;
  authorId: UserInterface['id'];
  originAuthorId: UserInterface['id'] | null;
  originPostId: BasePostInterface['id'] | null;
  extraFields: ExtraFields
}
