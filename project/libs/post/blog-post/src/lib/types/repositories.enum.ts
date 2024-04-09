import { PostType } from '@project/shared/core';
import { PostTextRepository } from '../repositories/post-text.repository';
import { PostLinkRepository } from '../repositories/post-link.repository';
import { PostQuoteRepository } from '../repositories/post-quote.repository';
import { PostPhotoRepository } from '../repositories/post-photo.repository';
import { PostVideoRepository } from '../repositories/post-video.repository';

export const RepositoryType = {
  [PostType.TEXT]: PostTextRepository,
  [PostType.LINK]: PostLinkRepository,
  [PostType.QUOTE]: PostQuoteRepository,
  [PostType.PHOTO]: PostPhotoRepository,
  [PostType.VIDEO]: PostVideoRepository,
} as const;

// type PostRepositoryTypes = (typeof RepositoryType)[keyof typeof RepositoryType];
