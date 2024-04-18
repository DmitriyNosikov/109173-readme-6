import { Module } from '@nestjs/common';

import { PostConfigModule } from '@project/post/post-config'
import { BlogPostModule } from '@project/blog-post'

@Module({
  imports: [
    PostConfigModule,
    BlogPostModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
