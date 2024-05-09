import { EntityFactory, SubscriberInterface } from '@project/shared/core'
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailSubscriberFactory implements EntityFactory<EmailSubscriberEntity> {
  public create(entityPlainData: SubscriberInterface): EmailSubscriberEntity {
    return new EmailSubscriberEntity(entityPlainData);
  }
}
