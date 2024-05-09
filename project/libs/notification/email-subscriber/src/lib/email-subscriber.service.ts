import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { omitUndefined } from '@project/shared/helpers';
import { SubscriberMessage } from './email-subscriber.constant';

import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { CreateEmailSubscriberDTO } from './dto/create-email-subscriber.dto';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
  ) {}

  public async addSubscriber(subscriber: CreateEmailSubscriberDTO): Promise<EmailSubscriberEntity | null> {
    const { email } = subscriber;
    const existsSubscriber = this.emailSubscriberRepository.findByEmail(email);

    if(existsSubscriber) {
      return existsSubscriber;
    }

    const subscriberEntity = new EmailSubscriberEntity(subscriber);

    await this.emailSubscriberRepository.create(subscriberEntity);

    return subscriberEntity;
  }

  public async getSubscriber(subscriberId: string): Promise<EmailSubscriberEntity | null> {
    const subscriber = await this.emailSubscriberRepository.findById(subscriberId);

    if(!subscriber) {
      throw new NotFoundException(SubscriberMessage.ERROR.NOT_FOUND);
    }

    return subscriber;
  }

  public async updateSubscriber(subscriberId: string, updatedFields: Partial<EmailSubscriberEntity>): Promise<EmailSubscriberEntity | null> {
    const isSubscriberExists = await this.emailSubscriberRepository.exists(subscriberId);

    if(!isSubscriberExists) {
      throw new NotFoundException(SubscriberMessage.ERROR.NOT_FOUND);
    }

    updatedFields = omitUndefined(updatedFields);

    if(Object.keys(updatedFields).length <= 0) {
      throw new BadRequestException(SubscriberMessage.ERROR.CANT_UPDATE);
    }

    const updatedSubscriber = await this.emailSubscriberRepository.updateById(subscriberId, updatedFields);

    return updatedSubscriber;
  }

  public async deleteSubscriber(subscriberId: string): Promise<void> {
    const isSubscriberExists = await this.emailSubscriberRepository.exists(subscriberId);

    if(!isSubscriberExists) {
      return;
    }

    return await this.emailSubscriberRepository.deleteById(subscriberId);
  }

  public async deleteSubscriberByEmail(email: string): Promise<void> {
    const isSubscriberExists = await this.emailSubscriberRepository.findByEmail(email);

    if(!isSubscriberExists) {
      return;
    }

    return await this.emailSubscriberRepository.deleteByEmail(email);
  }
}
