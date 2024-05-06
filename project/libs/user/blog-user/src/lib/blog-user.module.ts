import { Module } from '@nestjs/common';
import { BlogUserController } from './blog-user.controller'
import { BlogUserService } from './blog-user.service'
import { BlogUserRepository } from './blog-user.repository';
import { BlogUserFactory } from './blog-user.factory';
import { BCryptHasher } from '@project/shared/hasher'
import { MongooseModule } from '@nestjs/mongoose';
import { BlogUserModel, BlogUserSchema } from './blog-user.model';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogUserModel.name, schema: BlogUserSchema }
    ])
  ],
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
