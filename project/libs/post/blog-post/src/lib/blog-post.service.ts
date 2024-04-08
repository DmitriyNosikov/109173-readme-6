import { Injectable } from '@nestjs/common';

import { BasePostFactory } from './factories/base-post.factory';
import { BasePostRepository } from './repositories/base-post.repository';

import { BlogPostDTO } from './dto/blog-post.dto';
import { BlogPostFactory } from './factories/blog-post.factory';
import { BlogPostRepositoryFactory } from './factories/blog-post-repository.factory';
import { AllPostRelationRepository } from './repositories/all-post-relation.repository';
import { AllPostRelationInterface } from '@project/shared/core';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly basePostRepository: BasePostRepository,
    private readonly basePostFactory: BasePostFactory,

    private readonly blogPostFactory: BlogPostFactory,
    private readonly blogPostRepositoryFactory: BlogPostRepositoryFactory,

    private readonly allPostRelationRepository: AllPostRelationRepository
  ) {}
  async create(dto: BlogPostDTO): Promise<void> {
    // Сохраняем в БД основу для поста
    const basePostEntity = this.basePostFactory.create(dto); // Создаем Entity базового поста
    const basePost = await this.basePostRepository.create(basePostEntity); // Сохраняем в БД

    // Сохраняем дополнительные поля базового поста
    // (которыми как раз отличаются типизированные посты)
    const extraFields = basePostEntity.extraFields;
    const blogPostEntity = await this.blogPostFactory.create(extraFields)

    // Cохраняем все части нашего боста (базовая + дополнительная)
    // в связующую таблицу
    const allPostRelationFields: AllPostRelationInterface = {
      postId: basePost.id,
      postType: basePost.type,
      extraFieldsId: blogPostEntity.id
    };
    await this.allPostRelationRepository.create(allPostRelationFields);

    // return Promise.resolve(dto);
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
