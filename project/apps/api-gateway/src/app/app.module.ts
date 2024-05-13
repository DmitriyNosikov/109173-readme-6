import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ApiGatewayConfigModule } from '@project/api-gateway-config'
import { ConfigEnvironment } from '@project/shared/core';
import { getHttpOptions } from '@project/shared/helpers';
@Module({
  imports: [
    ApiGatewayConfigModule,

    // конфигурация для AXIOS
    HttpModule.registerAsync(
      getHttpOptions(ConfigEnvironment.API_GATEWAY)
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
