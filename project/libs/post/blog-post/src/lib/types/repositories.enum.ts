import { PostType } from '@project/shared/core';
import { TextPostRepository } from '../repositories/text-post.repository';
import { LinkPostRepository } from '../repositories/link-post.repository';
import { QuotePostRepository } from '../repositories/quote-post.repository';
import { PhotoPostRepository } from '../repositories/photo-post.repository';
import { VideoPostRepository } from '../repositories/video-post.repository';

export const RepositoryType = {
  [PostType.TEXT]: TextPostRepository,
  [PostType.QUOTE]: QuotePostRepository,
  [PostType.LINK]: LinkPostRepository,
  [PostType.PHOTO]: PhotoPostRepository,
  [PostType.VIDEO]: VideoPostRepository,
} as const;

export type RepositoriesList = (typeof RepositoryType)[keyof typeof RepositoryType]

export const PrismaRepositoryType = {
  [PostType.TEXT]: 'textPost',
  [PostType.QUOTE]: 'quotePost',
  [PostType.LINK]: 'linkPost',
  [PostType.PHOTO]: 'photoPost',
  [PostType.VIDEO]: 'videoPost',
} as const;
