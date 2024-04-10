import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { USERS_ENV_FILE_PATH } from './user-config.constant'
import appConfig from './configurations/app.config'
import dbConfig from './configurations/db.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // Cписок конфигураций для загрузки
      load: [appConfig, dbConfig],

      envFilePath: USERS_ENV_FILE_PATH
    })
  ],
  providers: [],
  controllers: [],
  exports: []
})
export class UserConfigModule {}
