import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { PostTypeEnum } from '@project/shared/core'
import { Repository } from '@project/shared/data-access';

import { BasePostEntity } from '../entities/base-post.entity';
import { RepositoryType } from '../types/repositories.enum';

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
