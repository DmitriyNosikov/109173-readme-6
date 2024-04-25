import { Module } from '@nestjs/common';

import { PostConfigModule } from '@project/post/post-config'
import { BlogPostModule } from '@project/blog-post'
import { LikeModule } from '@project/post/like'
import { CommentModule } from '@project/post/comment'

@Module({
  imports: [
    PostConfigModule,
    BlogPostModule,
    LikeModule,
    CommentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
