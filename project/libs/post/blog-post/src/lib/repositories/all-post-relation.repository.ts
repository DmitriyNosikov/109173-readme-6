import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access';
import { AllPostRelationEntity } from '../entities/all-post-relation.entity';
import { AllPostRelationInterface, PostTypeEnum } from '@project/shared/core';
import { AllPostRelationFactory } from '../factories/all-post-relation.factory';
import { PrismaClientService } from '@project/blog/models';

// Связущюее звено между Репозиторием базового поста (BlogPostRepository)
// и всеми остальными репозиториями (PostTextRepository, PostQuoteRepository и т.д.)
@Injectable()
export class AllPostRelationRepository extends BasePostgresRepository<AllPostRelationEntity, AllPostRelationInterface> {
  constructor(
    entityFactory: AllPostRelationFactory,
    readonly dbClient: PrismaClientService
  ) {
    super(entityFactory, dbClient);
  }

  public async create(entity: AllPostRelationEntity) {
    const postRelation = await this.dbClient.postRelation.create({
      data: { ...entity }
    });

    entity.id = postRelation.id;
    entity.createdAt = postRelation.createdAt;
    entity.updatedAt = postRelation.updatedAt;

    return entity;
  }

  public findByPostIdAndPostType(postId: string, postType: PostTypeEnum) {
    console.log(postId, postType);
    throw new Error('Method not implemented.');
  }

  public findById(): Promise<AllPostRelationEntity> {
    throw new Error('Method not implemented');
  }
}
