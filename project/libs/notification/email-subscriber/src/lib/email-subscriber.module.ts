import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigEnvironment } from '@project/shared/core';

import { EmailSubscriberModel, EmailSubscriberSchema } from './email-subscriber.model';
import { EmailSubscriberFactory } from './email-subscriber.factory';
import { EmailSubscriberController } from './email-subscriber.controller';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberRepository } from './email-subscriber.repository';

import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/shared/helpers';
import { SendMailModule } from './send-mail/send-mail.module';


@Module({
  imports: [
    // Модуль для подключение к БД с подписчиками
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema }
    ]),

    // Модуль для подключения RabbitMQ
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions(ConfigEnvironment.NOTIFY_RABBITMQ)
    ),

    // Модуль для отправки Email уведомлений
    SendMailModule
  ],
  controllers: [EmailSubscriberController],

  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository,
    EmailSubscriberFactory,
  ],

  exports: [EmailSubscriberRepository, EmailSubscriberFactory]
})
export class EmailSubscriberModule {}
