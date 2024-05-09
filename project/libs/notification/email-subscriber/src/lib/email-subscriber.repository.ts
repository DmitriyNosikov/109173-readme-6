import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongoDbRepository } from '@project/shared/data-access'

import { EmailSubscriberModel } from './email-subscriber.model';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberFactory } from './email-subscriber.factory';
import { SubscriberMessage } from './email-subscriber.constant';

@Injectable()
export class EmailSubscriberRepository extends BaseMongoDbRepository<EmailSubscriberEntity, EmailSubscriberModel> {
  constructor(
    entityFactory: EmailSubscriberFactory,
    @InjectModel(EmailSubscriberModel.name) emailSubscriberModel: Model<EmailSubscriberModel>
  ){
    super(entityFactory, emailSubscriberModel);
  }

  public async findByEmail(email: string): Promise<EmailSubscriberEntity | null> {
    const subscriber = await this.model.findOne({ email }).exec();

    if(!subscriber) {
      return Promise.resolve(null);
    }

    const subscriberEntity = this.createEntityFromDocument(subscriber);

    return Promise.resolve(subscriberEntity);
  }

  public async deleteByEmail(email: string): Promise<void> {
    const deletedDocument = await this.model.deleteOne({ email });

    if(!deletedDocument) {
      throw new NotFoundException(SubscriberMessage.ERROR.ENTITY_NOT_FOUND);
    }
  }
}
