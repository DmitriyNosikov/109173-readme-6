import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { PostTypeEnum } from '@project/shared/core'

import { RepositoriesList, RepositoryType } from '../types/repositories.enum';

type ModuleRefGetRepositoryType = ReturnType<ModuleRef['get'][keyof RepositoriesList]>;
@Injectable()
export class BlogPostRepositoryDeterminant {
  constructor( // Получаем ссылку на хранилище инстансов (как в inversify)
    private moduleRef: ModuleRef
  ) {}
  // Repository<PostEntities>
  public getRepository(postType: PostTypeEnum): ModuleRefGetRepositoryType {
    const repositoryType = RepositoryType[postType];

    if(!repositoryType) {
      return;
    }

    // Возвращаем из хранилища инстанс нужного репозитория
    return this.moduleRef.get(repositoryType);
  }
}
