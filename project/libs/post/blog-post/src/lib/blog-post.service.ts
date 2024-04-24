import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

import { CreateBasePostDTO } from './dto/create-blog-post.dto';
import { BlogPostRepositoryDeterminant } from './repositories/blog-post-determinant.repository';

import { BasePostFactory } from './factories/base-post.factory';
import { BasePostRepository } from './repositories/base-post.repository';

import { BlogPostFactory } from './factories/blog-post.factory';

import { AllPostRelationEntity } from './entities/all-post-relation.entity';
import { AllPostRelationFactory } from './factories/all-post-relation.factory';
import { AllPostRelationRepository } from './repositories/all-post-relation.repository';
import { PostTypeEnum } from '@project/shared/core';
import { BlogPostMessage } from './blog-post.constant';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly basePostRepository: BasePostRepository,
    private readonly basePostFactory: BasePostFactory,

    private readonly blogPostFactory: BlogPostFactory,
    private readonly blogPostRepositoryFactory: BlogPostRepositoryDeterminant,

    private readonly allPostRelationFactory: AllPostRelationFactory,
    private readonly allPostRelationRepository: AllPostRelationRepository
  ) {}
  async create(dto: CreateBasePostDTO): Promise<AllPostRelationEntity> {
    if(!this.checkPostType(dto.type)) {
      return;
    }

    // // Сохраняем в БД основу для поста
    const basePostEntity = this.basePostFactory.create(dto); // Создаем Entity базового поста
    const basePost = await this.basePostRepository.create(basePostEntity); // Сохраняем в БД

    // Сохраняем дополнительные поля базового поста
    // (которыми как раз отличаются типизированные посты)
    const extraFields = {
      type: dto.type,
      ...basePostEntity.extraFields
    };
    const blogPostEntity = this.blogPostFactory.create(extraFields)
    const blogPostRepository = this.blogPostRepositoryFactory.getRepository(dto.type);
    const blogPost = await blogPostRepository.create(blogPostEntity);

    // Cохраняем все части нашего боста (базовая + дополнительная)
    // в связующую таблицу
    const allPostRelationFields = {
      postId: basePost.id,
      postType: basePost.type,
      extraFieldsId: blogPostEntity.id
    };
    const allPostRelationEntity: AllPostRelationEntity = this.allPostRelationFactory.create(allPostRelationFields);
    const relationPost = await this.allPostRelationRepository.create(allPostRelationEntity);

    console.log('BASE POST: ', basePost);
    console.log('BLOG POST: ', blogPost);
    console.log('RELATION POST: ', relationPost);

    return allPostRelationEntity;
  }

  checkPostType(postType: PostTypeEnum) {
    const postRepository = this.blogPostRepositoryFactory.getRepository(postType);

    if(!postRepository) {
      throw new BadRequestException(BlogPostMessage.ERROR.POST_TYPE);
    }

    return true;
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
