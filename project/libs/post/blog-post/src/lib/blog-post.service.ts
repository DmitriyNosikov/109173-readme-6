import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

import { CreateBasePostDTO } from './dto/create-blog-post.dto';
import { CreatedBlogPostRDO } from './rdo/create-base-post.rdo';
import { BlogPostRepositoryDeterminant } from './repositories/blog-post-determinant.repository';

import { BasePostFactory } from './factories/base-post.factory';
import { BasePostRepository } from './repositories/base-post.repository';

import { BlogPostFactory } from './factories/blog-post.factory';

import { PostToExtraFieldsEntity } from './entities/post-to-extra-fields.entity';
import { PostToExtraFieldsFactory } from './factories/post-to-extra-fields';
import { PostToExtraFieldsRepository } from './repositories/post-to-extra-fields.repository';

import { PostTypeEnum } from '@project/shared/core';
import { BlogPostMessage } from './blog-post.constant';
import { BasePostEntity } from './entities/base-post.entity';
import { TagService } from '@project/tag';


@Injectable()
export class BlogPostService {
  private basePost: BasePostEntity;
  private extraFieldsPost; // <-- TODO: поправить типы
  private postToExtraFieldsRelation: PostToExtraFieldsEntity;

  constructor(
    private readonly basePostRepository: BasePostRepository,
    private readonly basePostFactory: BasePostFactory,

    private readonly blogPostFactory: BlogPostFactory,
    private readonly blogPostRepositoryFactory: BlogPostRepositoryDeterminant,

    private readonly postToExtraFieldsFactory: PostToExtraFieldsFactory,
    private readonly postToExtraFieldsRepository: PostToExtraFieldsRepository,

    private readonly tagService: TagService
  ) {}
  public async create(dto: CreateBasePostDTO): Promise<CreatedBlogPostRDO> {
    if(!this.checkPostType(dto.type)) {
      return;
    }
    // Сохраняем в БД основу для поста
    await this.createBasePost(dto);

    // Сохраняем дополнительные поля базового поста (которыми как раз отличаются типизированные посты)
    await this.createExtraFieldsPost(dto);

    // Cохраняем все части нашего боста (базовая + дополнительная) в связующую таблицу
    await this.createPostToExtraFields();

    const result: CreatedBlogPostRDO = {
      post: this.basePost,
      postToExtraFields: this.postToExtraFieldsRelation
    };

    return result;
  }

  public async findById(postId: string) {
    const post = await this.basePostRepository.findById(postId);

    if(!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    return post;
  }

  private checkPostType(postType: PostTypeEnum) {
    const postRepository = this.blogPostRepositoryFactory.getRepository(postType);

    if(!postRepository) {
      throw new BadRequestException(BlogPostMessage.ERROR.POST_TYPE);
    }

    return true;
  }


  private async createBasePost(dto: CreateBasePostDTO): Promise<void> {
    const basePostFields = this.getBasePostFields(dto);
    const basePostTags = await this.tagService.getOrCreate(basePostFields.tags);
    const basePostEntity = this.basePostFactory.create({
      ...basePostFields,
      tags: basePostTags
    });

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

  private async createPostToExtraFields(): Promise<void> {
    const allPostRelationFields = {
      postId: this.basePost.id,
      postType: this.basePost.type,
      extraFieldsId: this.extraFieldsPost.id,
    };
    const postToExtraFieldsEntity: PostToExtraFieldsEntity = this.postToExtraFieldsFactory.create(allPostRelationFields);

    this.postToExtraFieldsRelation = await this.postToExtraFieldsRepository.create(postToExtraFieldsEntity);
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
