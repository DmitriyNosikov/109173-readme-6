import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyConfigModule } from '@project/notify-config'
import { EmailSubscriberModule } from '@project/email-subscriber'
import { getMongooseOptions } from '@project/shared/helpers';
import { ConfigEnvironment } from '@project/shared/core';

@Module({
  imports: [
    NotifyConfigModule,
    MongooseModule.forRootAsync(
      getMongooseOptions(ConfigEnvironment.NOTIFY_MONGODB)
    ),
    EmailSubscriberModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
