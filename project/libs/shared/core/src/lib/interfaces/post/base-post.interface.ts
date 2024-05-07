import { UserInterface } from '../user/user.interface';
import { PostTypeEnum } from '../../types/post/post-type.enum';

import { CreatedUpdatedDatesInterface } from '../created-updated-dates.interface';

import { TagInterface } from '@project/tag';
import { CommentInterface } from '@project/post/comment';
import { LikeInterface } from '@project/post/like';

import { PostToExtraFieldsInterface } from './post-to-extra-fields.interface';
import { LinkPostInterface } from './link-post.interface';
import { TextPostInterface } from './text-post.interface';
import { QuotePostInterface } from './quote-post.interface';
import { PhotoPostInterface } from './photo-post.interface';
import { VideoPostInterface } from './video-post.interface';


export type ExtraFields = TextPostInterface| QuotePostInterface | LinkPostInterface | PhotoPostInterface | VideoPostInterface;
export interface BasePostInterface extends CreatedUpdatedDatesInterface{
  id?: string;
  publishedAt?: Date;

  type: PostTypeEnum;
  authorId: UserInterface['id'];
  isPublished: boolean;

  isRepost: boolean;
  originAuthorId: UserInterface['id'] | undefined;
  originPostId: BasePostInterface['id'] | undefined;

  tags: TagInterface[] | undefined;
  comments: CommentInterface[] | undefined;
  likes: LikeInterface[] | undefined;
  postToExtraFields?: PostToExtraFieldsInterface[] | undefined;
  extraFields?: ExtraFields[] | undefined;
}
