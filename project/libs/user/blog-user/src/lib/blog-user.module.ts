import { Module } from '@nestjs/common';
import { BlogUserController } from './blog-user.controller'
import { BlogUserService } from './blog-user.service'
import { BlogUserRepository } from './blog-user.repository';
import { BlogUserFactory } from './blog-user.factory';



@Module({
  controllers: [BlogUserController],
  providers: [BlogUserService, BlogUserRepository, BlogUserFactory],
  exports: [BlogUserRepository, BlogUserFactory]
})
export class BlogUserModule {}
