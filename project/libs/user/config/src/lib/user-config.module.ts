import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

const USERS_ENV_FILE_PATH = 'apps/user/user.env'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // TODO: Передать список конфигураций для загрузки
      load: [],

      envFilePath: USERS_ENV_FILE_PATH
    })
  ],
  providers: [],
  controllers: [],
  exports: []
})
export class UserConfigModule {}
