import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

import { fillDTO, omitUndefined } from '@project/shared/helpers';
import { PostNotifyService } from '@project/post-notify';

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
import { BlogPostQuery } from './types/queries/blog-post.query';
import { PostEntities } from './types/entities.enum';

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

    private readonly tagService: TagService,

    private readonly postNotifyService: PostNotifyService
  ) {}

  public async findAllPosts(): Promise<BasePostEntity[] | null> {
    const newPosts = await this.basePostRepository.findAll();

    await this.connectExtraFieldsToPosts(newPosts);

    return newPosts;
  }

  public async findById(postId: string) {
    const foundPost = await this.getPostWithExtraFields(postId);

    return foundPost;
  }

  public async create(dto: CreateBasePostDTO) {
    if(!this.checkPostType(dto.type)) {
      return;
    }
    // Сохраняем в БД основу для поста
    await this.createBasePost(dto);

    // Сохраняем дополнительные поля базового поста
    // (которыми как раз отличаются типизированные посты)
    await this.createExtraFieldsPost(dto);

    // Сохраняем все части нашего поста
    // (базовая + дополнительная) в связующую таблицу
    await this.createPostToExtraFields();

    const createdPost  = await this.getPostWithExtraFields(this.basePost.id);

    return createdPost;
  }

  public async getPaginatedPosts(query?: BlogPostQuery) {
    // Проверка типа поста
    if(query?.type) {
      this.checkPostType(query.type);
    }

    //  + фильтруем от лишних параметров, которые мог передать юзер
    const searchQuery = fillDTO(BlogPostQuery, query);
    // Очищаем запрос от undefined-значений
    const omitedQuery = omitUndefined(searchQuery as Record<string, unknown>);
    // Запрос
    const paginatedPosts = await this.basePostRepository.search(omitedQuery);

    if(!paginatedPosts || paginatedPosts.entities.length <= 0) {
      const queryParams = Object.entries(omitedQuery).join('; ').replace(/,/g, ' = ');

      throw new NotFoundException(`Can't find published posts by requested params: ${queryParams}`);
    }

    // Добавляем к полученным постам их ExtraFields
    await this.connectExtraFieldsToPosts(paginatedPosts.entities);

    return paginatedPosts;
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
      await this.postToExtraFieldsRepository.updateExtraFieldsByPost(basePost.id, basePost.type, updatedFields.extraFields)

      delete updatedFields.extraFields;
    }

    // Обновление тегов
    // TODO: по хорошему, надо сверять и удалять связи лишние, а новые добавлять
    let updatedTags = undefined;

    if(updatedFields.tags && updatedFields.tags.length > 0) {
      updatedTags = await this.tagService.getOrCreate(updatedFields.tags);
    }

    await this.basePostRepository.updateById(postId, {
      ...updatedFields,
      tags: updatedTags,
      extraFields: undefined
    });

    const updatedPost  = await this.getPostWithExtraFields(postId);

    return updatedPost;
  }

  public async delete(postId: string): Promise<void> {
    const post = await this.findById(postId);

    if(!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    // Удаляем ExtraFields для Post
    await this.postToExtraFieldsRepository.deleteExtraFieldsByPost(post.id, post.type)

    // удаляем пост
    await this.basePostRepository.deleteById(post.id);
  }

  // NOTIFICATION
  public async notifyAboutNewPosts() {
    // Получаем информацию о последней рассылке
    const lastNotify = await this.postNotifyService.findLastNotify();
    const findPostsCondition: BlogPostQuery = { sortDirection: 'desc' };

    if(lastNotify) {
      // Если найдена запись о последней рассылке, нужно
      // выбрать только те посты, что равны или старше даты
      // последней рассылки
      findPostsCondition.publishedAt = lastNotify.createdAt;
    }

    // Получаем посты (ВНИМАНИЕ: Возвращаются пагинированные посты,
    // т.е. только определеное количество, а не все)
    const newPosts = await this.basePostRepository.search(findPostsCondition);

    if(newPosts.entities. length <= 0) {
      console.log(`Didn't find new posts since last notification date: ${new Date(lastNotify.createdAt)}`);

      // Если постов нет - просто ничего не делаем
      return;
    }

    // Добавляем ExtraFields
    await this.connectExtraFieldsToPosts(newPosts.entities);

    const postsToSend = newPosts.entities.map((post) => post.toPOJO());

    // Уведомляем подписчиков о новых постах
    await this.postNotifyService.sendPostsNotify(postsToSend);

  }


  // SERVICE METHODS
  private async getPostWithExtraFields(postId: string) {
    const post = await this.basePostRepository.findById(postId);

    if(!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const postExtraFields = await this.postToExtraFieldsRepository.getExtraFields(post.id, post.type);

    return {
      ...post.toPOJO(),
      extraFields: [ postExtraFields.toPOJO() ]
    };
  }

  private typifyExtraFieldsIdsByPostType(posts) {
    const typedExtraFields = posts.reduce(( postsMap: Map<PostTypeEnum, string[]>, post: BasePostEntity) => {
      if(!postsMap.has(post.type)) {
        postsMap.set(post.type, [])
      }

      const postExtraFieldsIds = post.postToExtraFields.map((postToExtraFieldsItem) => postToExtraFieldsItem.extraFieldsId);

      postsMap.get(post.type).push(...postExtraFieldsIds);

      return postsMap;
    }, new Map<PostTypeEnum, string[]>());

    return typedExtraFields;
  }

  private async getTypifiedExtraFieldsValues(typifiedExtraFields: Map<PostTypeEnum, string[]>): Promise<Map<PostTypeEnum, PostEntities[]>>{
    const extraFieldsValuesMap = new Map();

    for(const [postType, extraFieldsIds] of typifiedExtraFields) {
      const postTypeExtraFields = await this.postToExtraFieldsRepository.getExtraFieldsByIds(postType, extraFieldsIds)

      extraFieldsValuesMap.set(postType, postTypeExtraFields)
    }

    return extraFieldsValuesMap;
  }

  private async connectExtraFieldsToPosts(posts: BasePostEntity[]) {
    if(!posts) {
      return;
    }

    // Получаем ExtraFields постов и собираем их в Map
    const typifiedExtraFieldsIds = this.typifyExtraFieldsIdsByPostType(posts);
    const typifiedExtraFieldsValues = await this.getTypifiedExtraFieldsValues(typifiedExtraFieldsIds);

    // Добавляем полученные ExtraFields к постам
    posts.map((post) => {
      const currentPostTypeExtraFields = typifiedExtraFieldsValues.get(post.type);

      post.postToExtraFields.forEach((relation) => {
        post['extraFields'] = [];

        currentPostTypeExtraFields.forEach((extraFields) => {
          if(extraFields.id === relation.extraFieldsId) {
            post['extraFields'].push(extraFields);
          }
        });
      });

      return post;
    })
  }

  private checkPostType(postType: PostTypeEnum) {
    const postRepository = this.blogPostRepositoryDeterminant.getRepository(postType);

    if(!postRepository) {
      throw new BadRequestException(`${BlogPostMessage.ERROR.POST_TYPE}: Passed: ${postType}`);
    }

    return true;
  }


  private async createBasePost(dto: CreateBasePostDTO): Promise<void> {
    const basePostTags = await this.tagService.getOrCreate(dto.tags);
    const basePostEntity = this.basePostFactory.create({
      ...dto,
      tags: basePostTags,
      comments: undefined,
      likes: undefined,
      extraFields: undefined,
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
