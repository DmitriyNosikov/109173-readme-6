import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';

import { resolve } from 'node:path';

export function getMailerAsyncOptions(optionSpace: string): MailerAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      return {
        transport: {
          host: configService.get<string>(`${optionSpace}.smtpHost`),
          port: configService.get<number>(`${optionSpace}.smtpPort`),
          secure: false,
          auth: {
            user: configService.get<string>(`${optionSpace}.smtpUser`),
            pass: configService.get<string>(`${optionSpace}.smtpPassword`)
          }
        },
        defaults: {
          from: configService.get<string>(`${optionSpace}.smtpFrom`),
        },
        template: {
          dir: resolve(__dirname, 'assets'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }
    },
    inject: [ConfigService],
  }
}
