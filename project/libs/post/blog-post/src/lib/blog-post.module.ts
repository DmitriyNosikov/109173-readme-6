import { Module } from '@nestjs/common';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { BasePostRepository } from './repositories/base-post.repository';
import { BlogPostFactory } from './factories/blog-post.factory';

@Module({
  controllers: [BlogPostController],
  providers: [BlogPostService, BasePostRepository, BlogPostFactory],
  exports: [BlogPostService, BasePostRepository]
})
export class BlogPostModule {}
