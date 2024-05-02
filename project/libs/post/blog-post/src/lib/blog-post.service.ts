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
  private postToExtraFields: PostToExtraFieldsEntity;

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


    const postExtraFields = await this.postToExtraFieldsRepository.getExtraFields(this.basePost.id, this.basePost.type);

    return {
      ...this.basePost.toPOJO(),
      extraFields: postExtraFields.toPOJO()
    }
  }

  public async findById(postId: string) {
    const post = await this.basePostRepository.findById(postId);

    if(!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    return post;
  }

  public async update(postId: string, updatedFields: Partial<UpdateBasePostDTO>) {
    const basePost: BasePostEntity = await this.basePostRepository.findById(postId);

    if(!basePost) {
      return;
    }

    // Пока подразумеваем, что тип поста не меняется
    // одному посту может соответствовать только один тип ExtraFields
    // !! хотя заготовка под мульти-пост уже есть как раз благодаря тому, что Post
    // !! хранит в свойсте PostToExtraFields массив связей
    // if(updatedFields.extraFields) {
    //   for(const postToExtraFieldsItem of basePost.postToExtraFields) {
    //     const extraFieldsRepository = this.blogPostRepositoryDeterminant.getRepository(postToExtraFieldsItem.postType)

    //     await extraFieldsRepository.updateById(postToExtraFieldsItem.extraFieldsId, updatedFields.extraFields);
    //   }

    //   delete updatedFields.extraFields;
    // }

    // Обновление тегов (TODO: по хорошему, надо сверять и удалять связи лишние, а новые добавлять)
    let updatedTags = undefined;

    if(updatedFields.tags) {
      updatedTags = await this.tagService.getOrCreate(updatedFields.tags);
    }

    this.basePostRepository.updateById(postId, {
      ...updatedFields,
      tags: updatedTags
    });
  }

  public async delete(postId: string): Promise<void> {
    const post = await this.findById(postId);

    if(!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    // const extraFieldsRepository = this.blogPostRepositoryDeterminant.getRepository(post.type)

    // Удаляем ExtraFields для Post
    // for(const extraFieldsItem of post.postToExtraFields) {
    //   await extraFieldsRepository.deleteById(extraFieldsItem.extraFieldsId);
    // }

    // удаляем пост
    await this.basePostRepository.deleteById(post.id);
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

    this.basePost = await this.basePostRepository.create(basePostEntity); // Сохраняем в БД
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

    this.postToExtraFields = await this.postToExtraFieldsRepository.create(postToExtraFieldsEntity);
  }

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
