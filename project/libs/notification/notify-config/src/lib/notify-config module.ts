import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NOTIFY_ENV_FILE_PATH } from './notify-config constant';

// CONFIGS
import notifyConfig from './notify-config';
import notifyRabbitMQConfig from './rabbitmq/rabitmq-config'
import notifyMongoDBConfig from './mongodb/mongodb-config';
import notifySmtpConfig from './smtp/smtp-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // Cписок конфигураций для загрузки
      load: [notifyConfig, notifyRabbitMQConfig, notifyMongoDBConfig, notifySmtpConfig],

      envFilePath: NOTIFY_ENV_FILE_PATH
    })
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class NotifyConfigModule {}
