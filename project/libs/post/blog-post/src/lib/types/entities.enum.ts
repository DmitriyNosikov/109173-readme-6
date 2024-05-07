import { PostType } from '@project/shared/core';
import { TextPostEntity } from '../entities/text-post.entity';
import { LinkPostEntity } from '../entities/link-post.entity';
import { QuotePostEntity } from '../entities/quote-post.entity';
import { PhotoPostEntity } from '../entities/photo-post.entity';
import { VideoPostEntity } from '../entities/video-post.entity';

export const EntityType = {
  [PostType.TEXT]: TextPostEntity,
  [PostType.QUOTE]: QuotePostEntity,
  [PostType.LINK]: LinkPostEntity,
  [PostType.PHOTO]: PhotoPostEntity,
  [PostType.VIDEO]: VideoPostEntity,
} as const;

export type PostEntities = TextPostEntity | QuotePostEntity| LinkPostEntity  | PhotoPostEntity | VideoPostEntity;
