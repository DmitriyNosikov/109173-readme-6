import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@project/user/authentication';
import { UserConfigModule } from '@project/user/user-config';
import { BlogUserModule } from '@project/user/blog-user';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigEnvironment } from '@project/shared/core';
import { getMongooseOptions } from '@project/shared/helpers';
@Module({
  imports: [
    UserConfigModule,
    MongooseModule.forRootAsync(
      getMongooseOptions(ConfigEnvironment.USER_MONGODB)
    ),
    AuthenticationModule,
    BlogUserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
