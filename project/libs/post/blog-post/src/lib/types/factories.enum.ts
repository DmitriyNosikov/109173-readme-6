import { PostType } from '@project/shared/core';
import { PostTextFactory } from '../factories/post-text.factory';
import { PostLinkFactory } from '../factories/post-link.factory';
import { PostQuoteFactory } from '../factories/post-quote.factory';
import { PostPhotoFactory } from '../factories/post-photo.factory';
import { PostVideoFactory } from '../factories/post-video.factory';

export const FactoryType = {
  [PostType.TEXT]: PostTextFactory,
  [PostType.LINK]: PostLinkFactory,
  [PostType.QUOTE]: PostQuoteFactory,
  [PostType.PHOTO]: PostPhotoFactory,
  [PostType.VIDEO]: PostVideoFactory,
} as const;

export type PostFactoryTypes = (typeof FactoryType)[keyof typeof FactoryType];
