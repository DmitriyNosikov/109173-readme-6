import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/data-access';
import { AllPostRelationEntity } from '../entities/all-post-relation.entity';
import { PostTypeEnum } from '@project/shared/core';
import { AllPostRelationFactory } from '../factories/all-post-relation.factory';

// Связущюее звено между Репозиторием базового поста (BlogPostRepository)
// и всеми остальными репозиториями (PostTextRepository, PostQuoteRepository и т.д.)
@Injectable()
export class AllPostRelationRepository extends BaseMemoryRepository<AllPostRelationEntity> {
  constructor(entityFactory: AllPostRelationFactory) {
    super(entityFactory);
  }

  findByPostIdAndPostType(postId: string, postType: PostTypeEnum) {
    console.log(postId, postType);
    throw new Error('Method not implemented.');
  }

  public findById(): Promise<AllPostRelationEntity> {
    throw new Error('Method not implemented');
  }
}
