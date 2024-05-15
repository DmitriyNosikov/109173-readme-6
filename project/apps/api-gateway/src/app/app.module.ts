import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ConfigEnvironment } from '@project/shared/core';
import { getHttpOptions } from '@project/shared/helpers';
import { ApiGatewayConfigModule } from '@project/api-gateway-config'

import { CheckAuthGuard } from './guards/check-auth.guard';
import { UsersController } from './controllers/users.controller';
import { PostsController } from './controllers/posts.controller';
@Module({
  imports: [
    ApiGatewayConfigModule,

    // конфигурация для AXIOS
    HttpModule.registerAsync(
      getHttpOptions(ConfigEnvironment.API_GATEWAY)
    )
  ],
  controllers: [
    UsersController,
    PostsController
  ],
  providers: [ CheckAuthGuard ],
})
export class AppModule {}
