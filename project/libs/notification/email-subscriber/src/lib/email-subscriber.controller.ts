import { Body, Controller, Delete, Get, Param, Patch, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { fillDTO } from '@project/shared/helpers'
import { MongoIdValidationPipe } from '@project/shared/pipes'
import { EmailSubscriberService } from './email-subscriber.service';

import { EmailSubscriberRDO } from './rdo/email-subscriber.rdo';
import { SubscriberMessage } from './email-subscriber.constant';
import { UpdateEmailSubscriberDTO } from './dto/update-email-subscriber.dto';
import { CreateEmailSubscriberDTO } from './dto/create-email-subscriber.dto';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitExchange, RabbitQueue, RabbitRouting } from '@project/shared/core';

@ApiTags('email subscribers')
@Controller('subscribers')
export class EmailSubscriberController {
  constructor(
    private readonly emailSubscriberService: EmailSubscriberService
  ){}

  // Декоратор RabbitSubscribe используется вместо декораторов @Post/@Get и т.д.
  // по сути, имплементируем паттер Publisher/SUbscriber
  // подписываясь по определенному RoutingKey на очередь queue

  // Когда в обменнике Exchange, в очереди Queue появится сообщение
  // с ключом RoutingKey - выполнится данный метод
  @RabbitSubscribe({
    routingKey: RabbitRouting.ADD_SUBSCRIBER,
    exchange: RabbitExchange.DEFAULT,
    queue: RabbitQueue.DEFAULT,
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
    await this.emailSubscriberService.addSubscriber(subscriber);
  }
}
