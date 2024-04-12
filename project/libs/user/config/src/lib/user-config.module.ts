import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { USERS_ENV_FILE_PATH } from './user-config.constant'
import { mongoConfig } from '@project/shared/data-access'
import userConfig from './user.config'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // Cписок конфигураций для загрузки
      load: [userConfig, mongoConfig],

      envFilePath: USERS_ENV_FILE_PATH
    })
  ],
  providers: [],
  controllers: [],
  exports: []
})
export class UserConfigModule {}
