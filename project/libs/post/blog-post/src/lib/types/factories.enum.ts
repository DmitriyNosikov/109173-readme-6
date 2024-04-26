import { PostType } from '@project/shared/core';
import { TextPostFactory } from '../factories/text-post.factory';
import { LinkPostFactory } from '../factories/link-post.factory';
import { QuotePostFactory } from '../factories/quote-post.factory';
import { PhotoPostFactory } from '../factories/photo-post.factory';
import { VideoPostFactory } from '../factories/video-post.factory';

export const FactoryType = {
  [PostType.TEXT]: TextPostFactory,
  [PostType.LINK]: LinkPostFactory,
  [PostType.QUOTE]: QuotePostFactory,
  [PostType.PHOTO]: PhotoPostFactory,
  [PostType.VIDEO]: VideoPostFactory,
} as const;

export type PostFactoryTypes = (typeof FactoryType)[keyof typeof FactoryType];
