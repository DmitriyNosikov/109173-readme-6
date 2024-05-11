import { Controller } from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger'

import { EmailSubscriberService } from './email-subscriber.service';

import { CreateEmailSubscriberDTO } from './dto/create-email-subscriber.dto';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { BasePostInterface, RabbitExchange, RabbitQueue, RabbitRouting } from '@project/shared/core';
import { SendMailService } from './send-mail/send-mail.service';

@ApiTags('email subscribers')
@Controller('subscribers')
export class EmailSubscriberController {
  constructor(
    private readonly emailSubscriberService: EmailSubscriberService,
    private readonly  sendMailService: SendMailService,
  ){}

  // Декоратор RabbitSubscribe используется вместо декораторов @Post/@Get и т.д.
  // по сути, имплементируем паттерн Publisher/Subscriber
  // подписываясь по определенному RoutingKey на очередь queue

  // Когда в обменнике Exchange, в очереди Queue появится сообщение
  // с ключом RoutingKey - выполнится данный метод
  @RabbitSubscribe({
    routingKey: RabbitRouting.ADD_SUBSCRIBER,
    exchange: RabbitExchange.INCOME,
    queue: RabbitQueue.INCOME
  })
  public async addNewSubscriber(subscriber: CreateEmailSubscriberDTO) {
    // Добавляем подписчика в базу MongoDB
    await this.emailSubscriberService.addSubscriber(subscriber);

    // Отправляем ему сообщение о подписке на Email
    await this.sendMailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    routingKey: RabbitRouting.ADD_NEW_POSTS,
    exchange: RabbitExchange.SEND_POSTS,
    queue: RabbitQueue.SEND_POSTS
  })
  public async notifyAboutNewPosts(posts: BasePostInterface[]) {
    // Получаем список подписчиков
    const subscribers = await this.emailSubscriberService.getAllSubscribers();

    if(!subscribers) {
      return;
    }

    // Рассылаем всем список новых постов
    for(const subscriber of subscribers) {
      await this.sendMailService.sendNotifyNewPosts(subscriber, posts);
    }
  }
}
