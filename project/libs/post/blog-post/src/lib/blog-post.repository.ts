import { BaseMemoryRepository } from '@project/shared/data-access'
import { BlogPostEntity } from './blog-post.entity';

export class BlogPostRepository extends BaseMemoryRepository<BlogPostEntity> {}
