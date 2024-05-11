import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { BasePostInterface, RabbitExchange, RabbitRouting } from '@project/shared/core';

@Injectable()
export class PostNotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection
  ) {}

  public async sendPosts(posts: BasePostInterface[]) {
    // Отправляем сообщение c новыми постами
    return this.rabbitClient.publish<BasePostInterface[]>(
      RabbitExchange.SEND_POSTS,
      RabbitRouting.ADD_NEW_POSTS,
      posts
    );
  }
}
