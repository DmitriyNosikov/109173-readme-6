import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { RabbitRouting } from '@project/shared/core';
import { userRabbitMQConfig } from '@project/user/user-config';

import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(userRabbitMQConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof userRabbitMQConfig>,
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    // Отправляем сообщение в обменник о регистрации нового пользователя
    return this.rabbitClient.publish<CreateSubscriberDto>(
      this.rabbiOptions.exchange,
      RabbitRouting.ADD_SUBSCRIBER,
      { ...dto }
    );
  }
}
