import { Module } from '@nestjs/common';
import { BlogUserController } from './blog-user.controller'
import { BlogUserService } from './blog-user.service'
import { BlogUserRepository } from './blog-user.repository';
import { BlogUserFactory } from './blog-user.factory';
import { BCryptHasher } from '@project/shared/hasher'


@Module({
  controllers: [BlogUserController],
  // Провайдеры модуля (API)
  providers: [
    BlogUserService,
    BlogUserRepository,
    BlogUserFactory,
    {
      provide: 'Hasher',
      useClass: BCryptHasher
    }
  ],
  //Провайдеры, доступные в других модулях при импорте данного модуля (внешнее API)
  exports: [BlogUserRepository, BlogUserFactory]
})
export class BlogUserModule {}
