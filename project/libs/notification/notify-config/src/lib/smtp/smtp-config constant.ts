import { MessagesType } from '@project/shared/core';

export const DEFAULT_SMTP_PORT = 25
export const DEFAULT_SMTP_FROM = 'admin@readme.test'

export const SmtpMessage: MessagesType = {
  ERROR: {
    // SMTP
    SMTP_HOST_REQUIRED: '[Notify App SMTP Config] host is required',
    SMTP_USER_REQUIRED: '[Notify App SMTP Config] user name is required',
    SMTP_PASSWORD_REQUIRED: '[Notify App SMTP Config] user password is required',
  },
} as const;
