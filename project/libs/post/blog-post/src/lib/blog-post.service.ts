import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

import { CreateBasePostDTO } from './dto/create-blog-post.dto';
import { CreatedBasePostRDO } from './rdo/create-base-post.rdo';
import { BlogPostRepositoryDeterminant } from './repositories/blog-post-determinant.repository';

import { BasePostFactory } from './factories/base-post.factory';
import { BasePostRepository } from './repositories/base-post.repository';

import { BlogPostFactory } from './factories/blog-post.factory';

import { AllPostRelationEntity } from './entities/all-post-relation.entity';
import { AllPostRelationFactory } from './factories/all-post-relation.factory';
import { AllPostRelationRepository } from './repositories/all-post-relation.repository';
import { PostTypeEnum } from '@project/shared/core';
import { BlogPostMessage } from './blog-post.constant';
import { BasePostEntity } from './entities/base-post.entity';


@Injectable()
export class BlogPostService {
  private basePost: BasePostEntity;
  private extraFieldsPost; // <-- TODO: поправить типы
  private relationPost: AllPostRelationEntity;

  constructor(
    private readonly basePostRepository: BasePostRepository,
    private readonly basePostFactory: BasePostFactory,

    private readonly blogPostFactory: BlogPostFactory,
    private readonly blogPostRepositoryFactory: BlogPostRepositoryDeterminant,

    private readonly allPostRelationFactory: AllPostRelationFactory,
    private readonly allPostRelationRepository: AllPostRelationRepository
  ) {}
  public async create(dto: CreateBasePostDTO): Promise<CreatedBasePostRDO> {
    if(!this.checkPostType(dto.type)) {
      return;
    }
    // Сохраняем в БД основу для поста
    await this.createBasePost(dto);

    // Сохраняем дополнительные поля базового поста (которыми как раз отличаются типизированные посты)
    await this.createExtraFieldsPost(dto);

    // Cохраняем все части нашего боста (базовая + дополнительная) в связующую таблицу
    await this.createPostRelation();

    const result: CreatedBasePostRDO = {
      post: this.basePost,
      postToExtraFields: this.relationPost
    };

    return result;
  }

  public checkPostType(postType: PostTypeEnum) {
    const postRepository = this.blogPostRepositoryFactory.getRepository(postType);

    if(!postRepository) {
      throw new BadRequestException(BlogPostMessage.ERROR.POST_TYPE);
    }

    return true;
  }

  private async createBasePost(dto: CreateBasePostDTO): Promise<void> {
    const basePostFields = this.getBasePostFields(dto);
    const basePostEntity = this.basePostFactory.create(basePostFields); // Создаем Entity базового поста

    this.basePost = await this.basePostRepository.create(basePostEntity); // Сохраняем в БД
  }

  private async createExtraFieldsPost(dto: CreateBasePostDTO): Promise<void> {
    const extraFields = {
      type: dto.type,
      ...dto.extraFields
    };
    const extraFieldsEntity = this.blogPostFactory.create(extraFields)
    const extraFieldsRepository = this.blogPostRepositoryFactory.getRepository(dto.type);

    this.extraFieldsPost = await extraFieldsRepository.create(extraFieldsEntity);
  }

  private async createPostRelation(): Promise<void> {
    const allPostRelationFields = {
      postId: this.basePost.id,
      postType: this.basePost.type,
      extraFieldsId: this.extraFieldsPost.id
    };
    const allPostRelationEntity: AllPostRelationEntity = this.allPostRelationFactory.create(allPostRelationFields);

    this.relationPost = await this.allPostRelationRepository.create(allPostRelationEntity);
  }

  private getBasePostFields(dto: CreateBasePostDTO) {
    return {
      type: dto.type,
      tags: dto.tags,
      isPublished: dto.isPublished,
      isRepost: dto.isRepost,
      authorId: dto.authorId,
      originAuthorId: dto.originAuthorId,
      originPostId: dto.originPostId,
    };
  }

  // update(postId: string, updatedFields: Partial<BlogPostEntity>) {
  //   throw new Error('Method not implemented.');
  // }

  // delete(): Promise<BlogPostEntity> {
  //   throw new Error('Method not implemented.');
  // }

  // show(postId: string): Promise<BlogPostEntity> {
  //   throw new Error('Method not implemented.');
  // }

  // getList(): Promise<BlogPostEntity[]> {
  //   throw new Error('Method not implemented.');
  // }

  // repost(postId: string, userId: string): Promise<BlogPostEntity> {
  //   throw new Error('Method not implemented.');
  // }

  // search(title: string): Promise<BlogPostEntity> {
  //   throw new Error('Method not implemented.');
  // }

  // uploadImage(postId: string, data: unknown) {
  //   throw new Error('Method not implemented.');
  // }

  // sort(sortType: SortTypeEnum, sortDirection: SortDirectionEnum): Promise<BlogPostEntity> {
  //   throw new Error('Method not implemented.');
  // }

}
