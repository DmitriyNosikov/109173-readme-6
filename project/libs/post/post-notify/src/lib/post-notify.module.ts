import { Module } from '@nestjs/common';
import { PostNotifyService } from './post-notify.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/shared/helpers';
import { ConfigEnvironment } from '@project/shared/core';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions(ConfigEnvironment.POST_RABBITMQ)
    ),
  ],
  controllers: [],
  providers: [PostNotifyService],
  exports: [PostNotifyService]
})
export class PostNotifyModule {}
