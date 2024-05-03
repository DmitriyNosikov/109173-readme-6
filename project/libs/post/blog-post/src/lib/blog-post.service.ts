import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

import { CreateBasePostDTO } from './dto/create-base-post.dto';
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
import { UpdateBasePostDTO } from './dto/update-base-post.dto';

@Injectable()
export class BlogPostService {
  private basePost: BasePostEntity;
  private extraFieldsPost; // <-- TODO: поправить типы

  constructor(
    private readonly basePostRepository: BasePostRepository,
    private readonly basePostFactory: BasePostFactory,

    private readonly blogPostFactory: BlogPostFactory,
    private readonly blogPostRepositoryDeterminant: BlogPostRepositoryDeterminant, // Фабрика для получения репозитория по типу поста

    private readonly postToExtraFieldsFactory: PostToExtraFieldsFactory,
    private readonly postToExtraFieldsRepository: PostToExtraFieldsRepository,

    private readonly tagService: TagService
  ) {}
  public async create(dto: CreateBasePostDTO) {
    if(!this.checkPostType(dto.type)) {
      return;
    }
    // Сохраняем в БД основу для поста
    await this.createBasePost(dto);

    // Сохраняем дополнительные поля базового поста (которыми как раз отличаются типизированные посты)
    await this.createExtraFieldsPost(dto);

    // Cохраняем все части нашего боста (базовая + дополнительная) в связующую таблицу
    await this.createPostToExtraFields();

    const createdPost  = await this.getPostWithExtraFields(this.basePost.id);

    return createdPost;
  }

  public async findById(postId: string) {
    const foundPost = await this.getPostWithExtraFields(postId);

    return foundPost;
  }

  public async update(postId: string, updatedFields: Partial<UpdateBasePostDTO>) {
    const basePost: BasePostEntity = await this.basePostRepository.findById(postId);

    if(!basePost) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    // Пока подразумеваем, что тип поста не меняется
    // одному посту может соответствовать только один тип ExtraFields
    // TODO: Нужна проверка на соответствие передаваемых полей типу поста
    if(updatedFields.extraFields) {
      const extraFieldsRepository = this.blogPostRepositoryDeterminant.getRepository(basePost.type)
      const postExtraFields = await this.postToExtraFieldsRepository.getExtraFields(basePost.id, basePost.type);

      await extraFieldsRepository.updateById(postExtraFields.id, updatedFields.extraFields);

      delete updatedFields.extraFields;
    }

    // Обновление тегов (TODO: по хорошему, надо сверять и удалять связи лишние, а новые добавлять)
    let updatedTags = undefined;

    if(updatedFields.tags && updatedFields.tags.length > 0) {
      updatedTags = await this.tagService.getOrCreate(updatedFields.tags);
    }

    await this.basePostRepository.updateById(postId, {
      ...updatedFields,
      tags: updatedTags
    });

    const updatedPost  = await this.getPostWithExtraFields(postId);

    return updatedPost;
  }

  public async delete(postId: string): Promise<void> {
    const post = await this.findById(postId);

    if(!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const extraFieldsRepository = this.blogPostRepositoryDeterminant.getRepository(post.type)
    const postExtraFields = await this.postToExtraFieldsRepository.getExtraFields(post.id, post.type);

    // Удаляем ExtraFields для Post
    await extraFieldsRepository.deleteById(postExtraFields.id)

    // удаляем пост
    await this.basePostRepository.deleteById(post.id);
  }

  public async getPaginatedPosts() {
    const getPaginatedPosts = await this.basePostRepository.getPaginatedPosts();

    return getPaginatedPosts;
  }

  private async getPostWithExtraFields(postId: string) {
    const post = await this.basePostRepository.findById(postId);

    if(!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const postExtraFields = await this.postToExtraFieldsRepository.getExtraFields(post.id, post.type);

    return {
      ...post.toPOJO(),
      extraFields: postExtraFields.toPOJO()
    };
  }

  private checkPostType(postType: PostTypeEnum) {
    const postRepository = this.blogPostRepositoryDeterminant.getRepository(postType);

    if(!postRepository) {
      throw new BadRequestException(BlogPostMessage.ERROR.POST_TYPE);
    }

    return true;
  }


  private async createBasePost(dto: CreateBasePostDTO): Promise<void> {
    const basePostTags = await this.tagService.getOrCreate(dto.tags);
    const basePostEntity = this.basePostFactory.create({
      ...dto,
      tags: basePostTags,
      comments: undefined,
      likes: undefined
    });

    // Сохраняем в БД
    this.basePost = await this.basePostRepository.create(basePostEntity);
  }

  private async createExtraFieldsPost(dto: CreateBasePostDTO): Promise<void> {
    const extraFields = {
      type: dto.type,
      ...dto.extraFields
    };
    const extraFieldsEntity = this.blogPostFactory.create(extraFields)
    const extraFieldsRepository = this.blogPostRepositoryDeterminant.getRepository(dto.type);

    this.extraFieldsPost = await extraFieldsRepository.create(extraFieldsEntity);
  }

  private async createPostToExtraFields(): Promise<void> {
    const allPostRelationFields = {
      postId: this.basePost.id,
      postType: this.basePost.type,
      extraFieldsId: this.extraFieldsPost.id,
    };
    const postToExtraFieldsEntity: PostToExtraFieldsEntity = this.postToExtraFieldsFactory.create(allPostRelationFields);

    await this.postToExtraFieldsRepository.create(postToExtraFieldsEntity);
  }
}
