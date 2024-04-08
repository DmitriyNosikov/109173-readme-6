import { UserInterface } from '../user/user.interface';
import { PostTypeEnum } from '../../types/post/post-type.enum';
import { PostLinkInterface } from './post-link.interface';
import { PostTextInterface } from './post-text.interface';
import { PostQuoteInterface } from './post-quote.interface';
import { PostPhotoInterface } from './post-photo.interface';
import { PostVideoInterface } from './post-video.interface';

export type ExtraFields = PostLinkInterface | PostTextInterface | PostQuoteInterface | PostPhotoInterface | PostVideoInterface;

export interface BasePostInterface {
  id: string;
  type: PostTypeEnum;
  tags: string[];
  publishedAt: string;
  createdAt: string;
  isPublished: boolean;
  isRepost: boolean;
  authorId: UserInterface['id'];
  originAuthorId: UserInterface['id'] | null;
  originPostId: BasePostInterface['id'] | null;
  extraFields: ExtraFields
}
