import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { PostType, PostTypeEnum } from '@project/shared/core'
import { Repository } from '@project/shared/data-access';

import { BasePostEntity } from '../entities/base-post.entity';
import { PostTextRepository } from '../repositories/post-text.repository';
import { PostLinkRepository } from '../repositories/post-link.repository';
import { PostQuoteRepository } from '../repositories/post-quote.repository';
import { PostPhotoRepository } from '../repositories/post-photo.repository';
import { PostVideoRepository } from '../repositories/post-video.repository';
import { BasePostRepository } from '../repositories/base-post.repository';

const RepositoryType = {
  [PostType.BASE]: BasePostRepository,
  [PostType.TEXT]: PostTextRepository,
  [PostType.LINK]: PostLinkRepository,
  [PostType.QUOTE]: PostQuoteRepository,
  [PostType.PHOTO]: PostPhotoRepository,
  [PostType.VIDEO]: PostVideoRepository,
} as const;

// type PostRepositoryTypes = (typeof RepositoryType)[keyof typeof RepositoryType];

@Injectable()
export class BlogPostRepositoryFactory {
  constructor( // Получаем ссылку на хранилище инстансов (как в inversify)
    private moduleRef: ModuleRef
  ) {}

  public getRepository(postType: PostTypeEnum): Repository<BasePostEntity> {
    const repositoryType = RepositoryType[postType];

    if(!repositoryType) {
      return;
    }

    // Возвращаем из хранилища инстанс нужного репозитория
    return this.moduleRef.get(repositoryType);
  }
}
