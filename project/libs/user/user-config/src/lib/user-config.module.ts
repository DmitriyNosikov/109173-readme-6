import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { USERS_ENV_FILE_PATH } from './user-config.constant'

// CONFIGS
import userConfig from './user.config'
import userJWTConfig from './jwt-config/jwt.config'
import userRabbitMQConfig from './rabbitmq/rabitmq-config'
import userMongoDBConfig from './mongodb/mongodb-config'


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // Cписок конфигураций для загрузки
      load: [userConfig, userJWTConfig, userMongoDBConfig, userRabbitMQConfig],

      envFilePath: USERS_ENV_FILE_PATH
    })
  ],
  providers: [],
  controllers: [],
  exports: []
})
export class UserConfigModule {}
