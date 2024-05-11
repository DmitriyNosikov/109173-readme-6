import { Controller, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { EmailSubscriberService } from './email-subscriber.service';

import { SubscriberMessage } from './email-subscriber.constant';
import { CreateEmailSubscriberDTO } from './dto/create-email-subscriber.dto';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitExchange, RabbitQueue, RabbitRouting } from '@project/shared/core';
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
  @ApiResponse({
    type: CreateEmailSubscriberDTO,
    status: HttpStatus.CREATED,
    description: SubscriberMessage.SUCCESS.CREATED
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: SubscriberMessage.ERROR.ALREADY_EXISTS
  })
  public async create(subscriber: CreateEmailSubscriberDTO) {
    // Добавляем подписчика в базу MongoDB
    await this.emailSubscriberService.addSubscriber(subscriber);

    // Отправляем ему сообщение о подписке на Email
    await this.sendMailService.sendNotifyNewSubscriber(subscriber);
  }
}
