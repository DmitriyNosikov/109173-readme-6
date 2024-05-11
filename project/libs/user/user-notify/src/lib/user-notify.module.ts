import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { ConfigEnvironment } from '@project/shared/core';
import { getRabbitMQOptions } from '@project/shared/helpers';

import { UserNotifyService } from './user-notify.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions(ConfigEnvironment.USER_RABBIT)
    ),
  ],
  providers: [UserNotifyService],
  exports: [UserNotifyService]
})
export class UserNotifyModule {}
