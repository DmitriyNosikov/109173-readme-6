import { Module } from '@nestjs/common';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { BlogPostRepository } from './repositories/blog-post.repository';
import { BlogPostFactory } from './factories/blog-post.factory';

@Module({
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository, BlogPostFactory],
  exports: [BlogPostService, BlogPostRepository]
})
export class BlogPostModule {}
