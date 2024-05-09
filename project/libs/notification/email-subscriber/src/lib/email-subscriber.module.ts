import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EmailSubscriberModel, EmailSubscriberSchema } from './email-subscriber.model';
import { EmailSubscriberFactory } from './email-subscriber.factory';
import { EmailSubscriberController } from './email-subscriber.controller';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberRepository } from './email-subscriber.repository';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema }
    ])
  ],
  controllers: [EmailSubscriberController],

  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository,
    EmailSubscriberFactory,
  ],

  exports: [EmailSubscriberRepository, EmailSubscriberFactory]
})
export class EmailSubscriberModule {}
