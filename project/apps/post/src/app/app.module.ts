import { Module } from '@nestjs/common';

import { PostConfigModule } from '@project/post/post-config'
import { BlogPostModule } from '@project/blog-post'
import { LikeModule } from '@project/post/like'
import { CommentModule } from '@project/post/comment'
import { TagModule } from '@project/tag'
import { PostNotifyModule } from '@project/post-notify';

@Module({
  imports: [
    PostConfigModule,
    PostNotifyModule,

    BlogPostModule,
    LikeModule,
    CommentModule,
    TagModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
