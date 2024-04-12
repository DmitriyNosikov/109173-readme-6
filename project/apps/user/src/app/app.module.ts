import { Module } from '@nestjs/common';

import { UserConfigModule } from '@project/user/config'
import { AuthenticationModule } from '@project/authentication';
import { BlogUserModule } from '@project/blog-user';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/shared/data-access';
@Module({
  imports: [
    UserConfigModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    ),
    AuthenticationModule,
    BlogUserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
