import { Module } from '@nestjs/common';
import { PostNotifyService } from './post-notify.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/shared/helpers';
import { ConfigEnvironment } from '@project/shared/core';
import { PostNotifyRepository } from './post-notify.repository';
import { PostNotifyFactory } from './post-notify.factory';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions(ConfigEnvironment.POST_RABBITMQ)
    ),
  ],
  controllers: [],
  providers: [PostNotifyService, PostNotifyRepository, PostNotifyFactory],
  exports: [PostNotifyService]
})
export class PostNotifyModule {}
