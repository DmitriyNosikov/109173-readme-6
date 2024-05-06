import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@project/user/authentication';
import { UserConfigModule } from '@project/user/user-config';
import { BlogUserModule } from '@project/user/blog-user';

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
