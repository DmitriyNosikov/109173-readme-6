import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { POSTS_ENV_FILE_PATH } from './post-config.constant'

// CONFIGS
import postConfig from './post.config'
import postRabbitMQConfig from './rabbitmq/rabitmq-config'
import postPostgressConfig from './postgres/postgres.config'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // Cписок конфигураций для загрузки
      load: [postConfig, postPostgressConfig, postRabbitMQConfig],

      envFilePath: POSTS_ENV_FILE_PATH
    })
  ],
  providers: [],
  controllers: [],
  exports: []
})
export class PostConfigModule {}
