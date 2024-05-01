import { Module } from '@nestjs/common'

import { BlogPostModule } from '@project/blog-post'

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { CommentFactory } from './comment.factory';

@Module({
  imports: [BlogPostModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, CommentFactory],
  exports: [CommentService]
})
export class CommentModule {}
