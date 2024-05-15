import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { API_GATEWAY_ENV_FILE_PATH } from './api-gateway-config.constant'

// CONFIGS
import apiGatewayConfig from './api-gateway.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // Cписок конфигураций для загрузки
      load: [apiGatewayConfig],

      envFilePath: API_GATEWAY_ENV_FILE_PATH
    })
  ],
  providers: [],
  controllers: [],
  exports: []
})
export class ApiGatewayConfigModule {}
