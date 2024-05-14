import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access';
import { PostToExtraFieldsEntity } from '../entities/post-to-extra-fields.entity';
import { PostToExtraFieldsInterface, PostTypeEnum } from '@project/shared/core';
import { PostToExtraFieldsFactory } from '../factories/post-to-extra-fields';
import { PrismaClientService } from '@project/blog/models';
import { BlogPostRepositoryDeterminant } from './blog-post-determinant.repository';
import { ExtraFieldsDTO } from '../dto/create-base-post.dto';

// Связущюее звено между Репозиторием базового поста (BlogPostRepository)
// и всеми остальными репозиториями (PostTextRepository, PostQuoteRepository и т.д.)
@Injectable()
export class PostToExtraFieldsRepository extends BasePostgresRepository<PostToExtraFieldsEntity, PostToExtraFieldsInterface> {
  constructor(
    entityFactory: PostToExtraFieldsFactory,
    readonly dbClient: PrismaClientService,
    private readonly blogPostRepositoryDeterminant: BlogPostRepositoryDeterminant
  ) {
    super(entityFactory, dbClient);
  }

  public async create(entity: PostToExtraFieldsEntity) {
    const postToExtraFields = await this.dbClient.postToExtraFields.create({
      data: { ...entity }
    });

    entity.id = postToExtraFields.id;
    entity.createdAt = postToExtraFields.createdAt;
    entity.updatedAt = postToExtraFields.updatedAt;

    return entity;
  }

  public async getExtraFields(postId: string, postType: PostTypeEnum) {
    const postToExtraFields = await this.dbClient.postToExtraFields.findFirst({
      where: {
        postId,
        postType
      }
    });
    const extraFieldsRepository = await this.blogPostRepositoryDeterminant.getRepository(postType)
    const document = await extraFieldsRepository.findById(postToExtraFields.extraFieldsId);
    const extraFields = extraFieldsRepository.createEntityFromDocument(document)

    return extraFields;
  }

  public async getExtraFieldsByIds(postType: PostTypeEnum, extraFieldsIDs: string[]) {
    const extraFieldsRepository = this.blogPostRepositoryDeterminant.getRepository(postType);
    const extraFields = await extraFieldsRepository.findByIds(extraFieldsIDs);

    return extraFields;
  }

  public async updateExtraFieldsByPost(postId: string, postType: PostTypeEnum, updatedFields: ExtraFieldsDTO) {
    const extraFieldsRepository = this.blogPostRepositoryDeterminant.getRepository(postType)
    const postExtraFields = await this.getExtraFields(postId, postType);

    await extraFieldsRepository.updateById(postExtraFields.id, updatedFields);
  }

  public async deleteExtraFieldsByPost(postId: string, postType: PostTypeEnum): Promise<void> {
    const extraFieldsRepository = this.blogPostRepositoryDeterminant.getRepository(postType)
    const postExtraFields = await this.getExtraFields(postId, postType);

    // Удаляем ExtraFields для Post
    await extraFieldsRepository.deleteById(postExtraFields.id);
  }
}
