import { Injectable } from '@nestjs/common';
import { PostType, PostTypeEnum } from '@project/shared/core'
import { PostTextRepository } from '../repositories/post-text.repository';
import { PostLinkRepository } from '../repositories/post-link.repository';
import { PostQuoteRepository } from '../repositories/post-quote.repository';
import { PostPhotoRepository } from '../repositories/post-photo.repository';
import { PostVideoRepository } from '../repositories/post-video.repository';

const RepositoryType = {
  [PostType.TEXT]: PostTextRepository,
  [PostType.LINK]: PostLinkRepository,
  [PostType.QUOTE]: PostQuoteRepository,
  [PostType.PHOTO]: PostPhotoRepository,
  [PostType.VIDEO]: PostVideoRepository,
} as const;

// type PostRepositoryTypes = (typeof RepositoryType)[keyof typeof RepositoryType];

@Injectable()
export class BlogPostRepositoryFactory {
  public getRepository<T extends PostTypeEnum>(postType: T): typeof RepositoryType[T] {
    const postRepository = RepositoryType[postType];

    if(!postRepository) {
      return;
    }

    return postRepository;
  }
}
