import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';


import { EMAIL_ADD_SUBSCRIBER_SUBJECT, EMAIL_NEW_POSTS } from './send-mail.constant';
import { notifySmtpConfig } from '@project/notify-config'
import { BasePostInterface, SubscriberInterface } from '@project/shared/core';

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

  public async sendNotifyNewPosts(subscriber: SubscriberInterface, posts: BasePostInterface[]) {
    console.log('Sending Email about new posts to subscriber: ', subscriber.email);

    await this.mailerService.sendMail({
      from: this.notifySmtpConfig.from,
      to: subscriber.email,
      subject: EMAIL_NEW_POSTS,
      template: './new-posts',
      context: {
        user: `${subscriber.firstName} ${subscriber.lastName}`,
        posts: posts
      }
    })
  }
}
