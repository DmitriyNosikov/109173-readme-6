import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { PostTypeEnum } from '@project/shared/core'
import { Repository } from '@project/shared/data-access';

import { RepositoryType } from '../types/repositories.enum';
import { PostEntities } from '../types/entities.enum';

@Injectable()
export class BlogPostRepositoryDeterminant {
  constructor( // Получаем ссылку на хранилище инстансов (как в inversify)
    private moduleRef: ModuleRef
  ) {}

  public getRepository(postType: PostTypeEnum): Repository<PostEntities> {
    const repositoryType = RepositoryType[postType];

    if(!repositoryType) {
      return;
    }

    // Возвращаем из хранилища инстанс нужного репозитория
    return this.moduleRef.get(repositoryType);
  }
}
