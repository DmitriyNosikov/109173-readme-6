import { Module } from '@nestjs/common';

import { PostConfigModule } from '@project/post/post-config'
import { BlogPostModule } from '@project/blog-post'
import { LikeModule } from '@project/post/like'

@Module({
  imports: [
    PostConfigModule,
    BlogPostModule,
    LikeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
