import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access';
import { PostToExtraFieldsEntity } from '../entities/post-to-extra-fields.entity';
import { PostToExtraFieldsInterface, PostTypeEnum } from '@project/shared/core';
import { PostToExtraFieldsFactory } from '../factories/post-to-extra-fields';
import { PrismaClientService } from '@project/blog/models';

// Связущюее звено между Репозиторием базового поста (BlogPostRepository)
// и всеми остальными репозиториями (PostTextRepository, PostQuoteRepository и т.д.)
@Injectable()
export class PostToExtraFieldsRepository extends BasePostgresRepository<PostToExtraFieldsEntity, PostToExtraFieldsInterface> {
  constructor(
    entityFactory: PostToExtraFieldsFactory,
    readonly dbClient: PrismaClientService
  ) {
    super(entityFactory, dbClient);
  }

  public async create(entity: PostToExtraFieldsEntity) {
    const postRelation = await this.dbClient.postToExtraFields.create({
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

  public findById(): Promise<PostToExtraFieldsEntity> {
    throw new Error('Method not implemented');
  }
}
