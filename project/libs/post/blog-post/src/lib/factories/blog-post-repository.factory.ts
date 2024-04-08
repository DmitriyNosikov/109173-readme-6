import { Injectable } from '@nestjs/common';
import { PostType, PostTypeEnum } from '@project/shared/core'
import { ConstructorRegistrator } from './constructor-registrator';
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

type PostRepositoryTypes = (typeof RepositoryType)[keyof typeof RepositoryType];

@Injectable()
export class BlogPostRepositoryFactory extends ConstructorRegistrator<PostTypeEnum, PostRepositoryTypes>{
  private repositoriesTypes: Map<PostTypeEnum, PostRepositoryTypes>;

  constructor(RepositoryType) {
    super(RepositoryType);

    this.repositoriesTypes = this.getConstructorsList();
  }

  public getRepository(postType: PostTypeEnum) {
    if(!this.repositoriesTypes.has(postType)) {
      return;
    }

    return this.repositoriesTypes.get(postType);
  }
}
