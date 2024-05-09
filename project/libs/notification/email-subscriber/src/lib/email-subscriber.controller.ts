import { Body, Controller, Delete, Get, Param, Patch, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { fillDTO } from '@project/shared/helpers'
import { MongoIdValidationPipe } from '@project/shared/pipes'
import { EmailSubscriberService } from './email-subscriber.service';

import { EmailSubscriberRDO } from './rdo/email-subscriber.rdo';
import { SubscriberMessage } from './email-subscriber.constant';
import { UpdateEmailSubscriberDTO } from './dto/update-email-subscriber.dto';

@ApiTags('email subscribers')
@Controller('subscribers')
export class EmailSubscriberController {
  constructor(
    private readonly emailSubscriberService: EmailSubscriberService
  ){}

  @ApiResponse({
    type: EmailSubscriberRDO,
    status: HttpStatus.OK,
    description: SubscriberMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: SubscriberMessage.ERROR.NOT_FOUND
  })
  @Get(':subscriberId')
  public async show(@Param('subscriberId', MongoIdValidationPipe) subscriberId: string): Promise<EmailSubscriberRDO | EmailSubscriberRDO[]> {
    const subscriber = await this.emailSubscriberService.getSubscriber(subscriberId);

    return fillDTO(EmailSubscriberRDO, subscriber.toPOJO());
  }

  @ApiResponse({
    type: EmailSubscriberRDO,
    status: HttpStatus.CREATED,
    description: SubscriberMessage.SUCCESS.UPDATED
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: SubscriberMessage.ERROR.CANT_UPDATE
  })
  @Patch(':subscriberId')
  public async updateUser(
    @Param('subscriberId', MongoIdValidationPipe) subscriberId: string,
    @Body() dto: UpdateEmailSubscriberDTO
  ): Promise<EmailSubscriberRDO | EmailSubscriberRDO[]> {
    const { email, firstName, lastName } = dto;
    const updatedSubscriber= await this.emailSubscriberService.updateSubscriber(subscriberId, { email, firstName, lastName });

    return fillDTO(EmailSubscriberRDO, updatedSubscriber.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: SubscriberMessage.SUCCESS.DELETED
  })
  @Delete(':subscriberId')
  public async deleteSubscriber(@Param('subscriberId', MongoIdValidationPipe) subscriberId: string): Promise<void> {
    await this.emailSubscriberService.deleteSubscriber(subscriberId);
  }


  @ApiResponse({
    status: HttpStatus.OK,
    description: SubscriberMessage.SUCCESS.DELETED
  })
  @Delete(':subscriberEmail')
  public async deleteSubscriberByEmail(@Param('subscriberEmail', MongoIdValidationPipe) subscriberEmail: string): Promise<void> {
    await this.emailSubscriberService.deleteSubscriberByEmail(subscriberEmail);
  }
}
