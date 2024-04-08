import { BaseMemoryRepository } from '@project/shared/data-access'
import { BlogPostEntity } from '../blog-post.entity';
import { Injectable } from '@nestjs/common';
import { BlogPostFactory } from '../factories/blog-post.factory';

@Injectable()
export class BlogPostRepository extends BaseMemoryRepository<BlogPostEntity> {
  constructor(entityFactory: BlogPostFactory){
    super(entityFactory);
  }
}
