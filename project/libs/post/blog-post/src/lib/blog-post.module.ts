import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/blog/models'

import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { BasePostRepository } from './repositories/base-post.repository';
import { BasePostFactory } from './factories/base-post.factory';

import { BlogPostFactory } from './factories/blog-post.factory';
import { BlogPostRepositoryDeterminant } from './repositories/blog-post-determinant.repository';

import { TextPostRepository } from './repositories/text-post.repository';
import { LinkPostRepository } from './repositories/link-post.repository';
import { QuotePostRepository } from './repositories/quote-post.repository';
import { PhotoPostRepository } from './repositories/photo-post.repository';
import { VideoPostRepository } from './repositories/video-post.repository';

import { PostToExtraFieldsFactory } from './factories/post-to-extra-fields';
import { PostToExtraFieldsRepository } from './repositories/post-to-extra-fields.repository';
import { TextPostFactory } from './factories/text-post.factory';
import { LinkPostFactory } from './factories/link-post.factory';
import { QuotePostFactory } from './factories/quote-post.factory';
import { PhotoPostFactory } from './factories/photo-post.factory';
import { VideoPostFactory } from './factories/video-post.factory';

@Module({
  imports: [PrismaClientModule],
  controllers: [BlogPostController],
  providers: [
    BasePostRepository,
    BasePostFactory,

    BlogPostFactory,
    BlogPostService,
    BlogPostRepositoryDeterminant,

    TextPostFactory,
    TextPostRepository,

    LinkPostFactory,
    LinkPostRepository,

    QuotePostFactory,
    QuotePostRepository,

    PhotoPostFactory,
    PhotoPostRepository,

    VideoPostFactory,
    VideoPostRepository,

    PostToExtraFieldsFactory,
    PostToExtraFieldsRepository
  ],
  exports: [BlogPostService]
})
export class BlogPostModule {}
