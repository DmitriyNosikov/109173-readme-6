import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { BasePostInterface, RabbitExchange, RabbitRouting } from '@project/shared/core';
import { PostNotifyFactory } from './post-notify.factory';
import { PostNotifyRepository } from './post-notify.repository';

@Injectable()
export class PostNotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    private readonly postNotifyFactory: PostNotifyFactory,
    private readonly postNotifyRepository: PostNotifyRepository
  ) {}

  public async sendPostsNotify(posts: BasePostInterface[]) {
    // Отправляем сообщение c новыми постами
    const publishedNotify = await this.rabbitClient.publish<BasePostInterface[]>(
      RabbitExchange.SEND_POSTS,
      RabbitRouting.ADD_NEW_POSTS,
      posts
    );

    // Добавляем запись о проведенной рассылке, чтобы
    // в дальнейшем иметь возможность рассылать информацию
    // только о тех постах, что появились после последней
    // рассылки
    await this.addNotifyRecord(posts);

    return publishedNotify;
  }

  public async addNotifyRecord(posts: BasePostInterface[]) {
    const postIds = posts.map((post) => post.id);
    const postNotifyEntity = this.postNotifyFactory.create({ postIds })

    // Создаем запись о проведенной рассылке
    await this.postNotifyRepository.create(postNotifyEntity);
  }

  public async findLastNotify() {
    const lastNotification = await this.postNotifyRepository.findLast();

    return lastNotification;
  }
}
