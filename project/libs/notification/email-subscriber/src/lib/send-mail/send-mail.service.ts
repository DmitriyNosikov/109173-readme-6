import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';


import { EMAIL_ADD_SUBSCRIBER_SUBJECT } from './send-mail.constant';
import { notifySmtpConfig } from '@project/notify-config'
import { SubscriberInterface } from '@project/shared/core';

@Injectable()
export class SendMailService {
  constructor(private readonly mailerService: MailerService) {}

  @Inject(notifySmtpConfig.KEY)
  private readonly notifySmtpConfig: ConfigType<typeof notifySmtpConfig>

  public async sendNotifyNewSubscriber(subscriber: SubscriberInterface) {
    await this.mailerService.sendMail({
      from: this.notifySmtpConfig.from,
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.firstName} ${subscriber.lastName}`,
        email: `${subscriber.email}`,
      }
    })
  }
}
