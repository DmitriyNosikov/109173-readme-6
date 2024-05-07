import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JWT_ENV_FILE_PATH } from './jwt-config.constant'

import jwtConfig from './jwt.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // Cписок конфигураций для загрузки
      load: [jwtConfig],

      envFilePath: JWT_ENV_FILE_PATH
    })
  ],
  providers: [],
  controllers: [],
  exports: []
})
export class JWTConfigModule {}
