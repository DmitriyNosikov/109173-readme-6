import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigEnvironment } from '@project/shared/core';
import { getMailerAsyncOptions } from '@project/shared/helpers';
import { SendMailService } from './send-mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync(
      getMailerAsyncOptions(ConfigEnvironment.NOTIFY)
    )
  ],

  controllers: [],
  providers: [SendMailService],
  exports: [SendMailService]

})
export class SendMailModule {}
