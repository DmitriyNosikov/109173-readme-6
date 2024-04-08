import { Repository } from '@project/shared/data-access';
import { AllPostRelationEntity } from '../entities/all-post-relation.entity';
import { PostTypeEnum } from '@project/shared/core';

// Связущюее звено между Репозиторием базового поста (BlogPostRepository)
// и всеми остальными репозиториями (PostTextRepository, PostQuoteRepository и т.д.)
export class AllPostRelationRepository implements Repository<AllPostRelationEntity> {
  findById(entityId: string): Promise<AllPostRelationEntity> {
    console.log(entityId);
    throw new Error('Method not implemented.', );
  }

  findByPostIdAndPostType(postId: string, postType: PostTypeEnum) {
    console.log(postId, postType);
    throw new Error('Method not implemented.');
  }

  create(entity: AllPostRelationEntity): Promise<unknown> {
    console.log(entity);
    throw new Error('Method not implemented.');
  }

  updateById(entityId: string, updatedFields: Partial<AllPostRelationEntity>): Promise<AllPostRelationEntity> {
    console.log(entityId, updatedFields);
    throw new Error('Method not implemented.');
  }

  deleteById(entityId: string): Promise<void> {
    console.log(entityId);
    throw new Error('Method not implemented.');
  }

  exists(entityId: string): Promise<boolean> {
    console.log(entityId);
    throw new Error('Method not implemented.');
  }

}
