import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { USERS_ENV_FILE_PATH } from './user-config.constant'
import { mongoConfig } from '@project/shared/data-access'
import { jwtConfig } from '@project/shared/configurations/jwt-config'
import userConfig from './user.config'
import rabbitConfig from './rabbit/rabbit-config'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // Cписок конфигураций для загрузки
      load: [userConfig, mongoConfig, jwtConfig, rabbitConfig],

      envFilePath: USERS_ENV_FILE_PATH
    })
  ],
  providers: [],
  controllers: [],
  exports: []
})
export class UserConfigModule {}
