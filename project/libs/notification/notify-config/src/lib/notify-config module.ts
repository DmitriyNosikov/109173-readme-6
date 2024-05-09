import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NOTIFY_ENV_FILE_PATH } from './notify-config constant';
import notifyConfig from './notify-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // Cписок конфигураций для загрузки
      load: [notifyConfig],

      envFilePath: NOTIFY_ENV_FILE_PATH
    })
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class NotifyConfigModule {}
