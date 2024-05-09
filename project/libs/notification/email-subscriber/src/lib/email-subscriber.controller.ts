import { Body, Controller, Delete, Get, Param, Patch, HttpStatus, Post } from '@nestjs/common';
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
  public async create(subscriber: CreateEmailSubscriberDTO): Promise<EmailSubscriberRDO> {
    const newSubscriber = await this.emailSubscriberService.addSubscriber(subscriber);

    return fillDTO(EmailSubscriberRDO, newSubscriber.toPOJO());
  }

  @Get(':subscriberId')
  @ApiResponse({
    type: EmailSubscriberRDO,
    status: HttpStatus.OK,
    description: SubscriberMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: SubscriberMessage.ERROR.NOT_FOUND
  })
  public async show(@Param('subscriberId', MongoIdValidationPipe) subscriberId: string): Promise<EmailSubscriberRDO | EmailSubscriberRDO[]> {
    const subscriber = await this.emailSubscriberService.getSubscriber(subscriberId);

    return fillDTO(EmailSubscriberRDO, subscriber.toPOJO());
  }

  @Patch(':subscriberId')
  @ApiResponse({
    type: EmailSubscriberRDO,
    status: HttpStatus.CREATED,
    description: SubscriberMessage.SUCCESS.UPDATED
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: SubscriberMessage.ERROR.CANT_UPDATE
  })
  public async updateUser(
    @Param('subscriberId', MongoIdValidationPipe) subscriberId: string,
    @Body() dto: UpdateEmailSubscriberDTO
  ): Promise<EmailSubscriberRDO | EmailSubscriberRDO[]> {
    const { email, firstName, lastName } = dto;
    const updatedSubscriber= await this.emailSubscriberService.updateSubscriber(subscriberId, { email, firstName, lastName });

    return fillDTO(EmailSubscriberRDO, updatedSubscriber.toPOJO());
  }

  @Delete(':subscriberId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: SubscriberMessage.SUCCESS.DELETED
  })
  public async deleteSubscriber(@Param('subscriberId', MongoIdValidationPipe) subscriberId: string): Promise<void> {
    await this.emailSubscriberService.deleteSubscriber(subscriberId);
  }


  @Delete(':subscriberEmail')
  @ApiResponse({
    status: HttpStatus.OK,
    description: SubscriberMessage.SUCCESS.DELETED
  })
  public async deleteSubscriberByEmail(@Param('subscriberEmail', MongoIdValidationPipe) subscriberEmail: string): Promise<void> {
    await this.emailSubscriberService.deleteSubscriberByEmail(subscriberEmail);
  }
}
