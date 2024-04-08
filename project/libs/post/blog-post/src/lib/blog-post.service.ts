import { Injectable } from '@nestjs/common';
// import { BlogPostServiceInterface } from './blog-post-service.interface'
// import { SortTypeEnum, SortDirectionEnum } from '@project/shared/core';
// import { BlogPostEntity } from './blog-post.entity';
import { BlogPostTypesDTO } from './dto/blog-post.dto';
import { BlogPostFactory } from './factories/blog-post.factory';
import { BlogPostRepositoryFactory } from './factories/blog-post-repository.factory';

@Injectable()
export class BlogPostService {
  constructor(
    private blogPostFactory: BlogPostFactory,
    private blogPostRepositoryFactory: BlogPostRepositoryFactory
  ) {}
  // create(dto: BlogPostTypesDTO): Promise<BlogPostEntity> {
  create(dto: BlogPostTypesDTO): void {
    const postFactoryInstance = this.blogPostFactory.getFactoryInstance(dto.type);
    const postRepositoryConstructor = this.blogPostRepositoryFactory.getRepository(dto.type);
    const postRepository = new postRepositoryConstructor(postFactoryInstance);

    console.log('POST DATA: ', dto);
    console.log('REPO: ', postRepository);

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
