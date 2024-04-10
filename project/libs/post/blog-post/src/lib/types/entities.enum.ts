import { PostType } from '@project/shared/core';
import { PostTextEntity } from '../entities/post-text.entity';
import { PostLinkEntity } from '../entities/post-link.entity';
import { PostQuoteEntity } from '../entities/post-quote.entity';
import { PostPhotoEntity } from '../entities/post-photo.entity';
import { PostVideoEntity } from '../entities/post-video.entity';

export const EntityType = {
  [PostType.TEXT]: PostTextEntity,
  [PostType.LINK]: PostLinkEntity,
  [PostType.QUOTE]: PostQuoteEntity,
  [PostType.PHOTO]: PostPhotoEntity,
  [PostType.VIDEO]: PostVideoEntity,
} as const;

export type PostEntities = PostTextEntity | PostLinkEntity | PostQuoteEntity | PostPhotoEntity | PostVideoEntity;
