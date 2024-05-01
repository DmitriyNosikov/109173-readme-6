import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { postgresConfig } from '@project/shared/data-access'

import { POSTS_ENV_FILE_PATH } from './post-config.constant'
import postConfig from './post.config'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // Cписок конфигураций для загрузки
      load: [postgresConfig, postConfig],

      envFilePath: POSTS_ENV_FILE_PATH
    })
  ],
  providers: [],
  controllers: [],
  exports: []
})
export class PostConfigModule {}
