import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NOTIF_ENV_FILE_PATH } from './notif-config constant';
import notifConfig from './notif-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // Cписок конфигураций для загрузки
      load: [notifConfig],

      envFilePath: NOTIF_ENV_FILE_PATH
    })
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class NotifyConfigModule {}
