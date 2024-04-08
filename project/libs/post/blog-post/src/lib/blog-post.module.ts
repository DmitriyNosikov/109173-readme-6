import { Module } from '@nestjs/common';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { BasePostRepository } from './repositories/base-post.repository';
import { BasePostFactory } from './factories/base-post.factory';
import { AllPostRelationRepository } from './factories/all-post-relation.repository';

@Module({
  controllers: [BlogPostController],
  providers: [
    BlogPostService,
    BasePostRepository,
    BasePostFactory,
    AllPostRelationRepository
  ],
  exports: [
    BlogPostService,
    BasePostRepository,
    BasePostFactory,
    AllPostRelationRepository
  ]
})
export class BlogPostModule {}
