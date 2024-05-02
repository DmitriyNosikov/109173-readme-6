import { UserInterface } from '../user/user.interface';
import { PostTypeEnum } from '../../types/post/post-type.enum';
import { CommentInterface } from '../comment.interface';
import { LikeInterface } from '../like.interface';
import { CreatedUpdatedDatesInterface } from '../created-updated-dates.interface';
import { TagInterface } from '../tag.interface';

// import { PostToExtraFieldsInterface } from './post-to-extra-fields.interface';
// import { TextPostInterface } from './text-post.interface';
// import { QuotePostInterface } from './quote-post.interface';
// import { LinkPostInterface } from './link-post.interface';
// import { PhotoPostInterface } from './photo-post.interface';
// import { VideoPostInterface } from './video-post.interface';

// export type ExtraFields = TextPostInterface | QuotePostInterface | LinkPostInterface | PhotoPostInterface | VideoPostInterface;
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
  comments?: CommentInterface[] | undefined;
  likes?: LikeInterface[] | undefined;
  // extraFields?: ExtraFields | undefined;
  // postToExtraFields?: PostToExtraFieldsInterface[] | undefined;
}
