import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ConfigEnvironment } from '@project/shared/core';
import { getHttpOptions } from '@project/shared/helpers';
import { ApiGatewayConfigModule } from '@project/api-gateway-config'

import { CheckAuthGuard } from './guards/check-auth.guard';
@Module({
  imports: [
    ApiGatewayConfigModule,

    // конфигурация для AXIOS
    HttpModule.registerAsync(
      getHttpOptions(ConfigEnvironment.API_GATEWAY)
    )
  ],
  controllers: [],
  providers: [ CheckAuthGuard ],
})
export class AppModule {}
