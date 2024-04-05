import { BaseMemoryRepository } from '@project/shared/data-access'
import { BlogPostEntity } from './blog-post.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogPostRepository extends BaseMemoryRepository<BlogPostEntity> {}
