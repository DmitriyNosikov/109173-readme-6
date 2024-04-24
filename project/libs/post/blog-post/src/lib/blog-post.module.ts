import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/blog/models'

import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { BasePostRepository } from './repositories/base-post.repository';
import { BasePostFactory } from './factories/base-post.factory';

import { BlogPostFactory } from './factories/blog-post.factory';
import { BlogPostRepositoryDeterminant } from './repositories/blog-post-determinant.repository';

import { PostTextRepository } from './repositories/post-text.repository';
import { PostLinkRepository } from './repositories/post-link.repository';
import { PostQuoteRepository } from './repositories/post-quote.repository';
import { PostPhotoRepository } from './repositories/post-photo.repository';
import { PostVideoRepository } from './repositories/post-video.repository';

import { AllPostRelationFactory } from './factories/all-post-relation.factory';
import { AllPostRelationRepository } from './repositories/all-post-relation.repository';
import { PostTextFactory } from './factories/post-text.factory';
import { PostLinkFactory } from './factories/post-link.factory';
import { PostQuoteFactory } from './factories/post-quote.factory';
import { PostPhotoFactory } from './factories/post-photo.factory';
import { PostVideoFactory } from './factories/post-video.factory';

@Module({
  imports: [PrismaClientModule],
  controllers: [BlogPostController],
  providers: [
    BasePostRepository,
    BasePostFactory,

    BlogPostFactory,
    BlogPostService,
    BlogPostRepositoryDeterminant,

    PostTextFactory,
    PostTextRepository,

    PostLinkFactory,
    PostLinkRepository,

    PostQuoteFactory,
    PostQuoteRepository,

    PostPhotoFactory,
    PostPhotoRepository,

    PostVideoFactory,
    PostVideoRepository,

    AllPostRelationFactory,
    AllPostRelationRepository
  ],
  exports: []
})
export class BlogPostModule {}
