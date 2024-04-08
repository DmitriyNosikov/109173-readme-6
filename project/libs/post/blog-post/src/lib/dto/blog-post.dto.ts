import { BasePostInterface, ExtraFields, PostTypeEnum, UserInterface } from '@project/shared/core';
import { PostLinkDTO } from './post-link.dto';
import { PostTextDTO } from './post-text.dto';
import { PostQuoteDTO } from './post-quote.dto';
import { PostPhotoDTO } from './post-photo.dto';
import { PostVideoDTO } from './post-video.dto';

export type ExtraFieldsDTO = BlogPostDTO | PostLinkDTO | PostTextDTO | PostQuoteDTO | PostPhotoDTO | PostVideoDTO;

export class BlogPostDTO {
  public type: PostTypeEnum;
  public tags: string[];
  public publishedAt: string;
  public createdAt: string;
  public isPublished: boolean;
  public isRepost: boolean;
  public authorId: UserInterface['id'];
  public originAuthorId: UserInterface['id'] | null;
  public originPostId: BasePostInterface['id'] | null;
  public extraFields: ExtraFields;
}
