import { MessagesType } from '@project/shared/core';

export const NOTIFY_ENV_FILE_PATH = 'apps/notification/notification.env'

export const DEFAULT_PORT = 9000;

export const DEFAULT_MONGODB_PORT = 27020;
export const DEFAULT_MONGODB_EXPRESS_PORT = 8083;

export const DEFAULT_RAMMITMQ_PORT = 5672;
export const DEFAULT_RABBITMQ_UI_PORT = 1088;

export const DEFAULT_SMTP_PORT = 25
export const DEFAULT_SMTP_FROM = 'admin@readme.test'

export const NotifyMessage: MessagesType = {
  ERROR: {
    // SERVER
    NOTIFY_APP_HOST_REQUIRED: '[Notify App Config] host is required',
    VALIDATION: '[Notification Config] Validation failed. Errors: ',

    // MONGODB
    MONGODB_DBNAME_REQUIRED: '[Notify App MongoDB Config] database name is required',
    MONGODB_HOST_REQUIRED: '[Notify App MongoDB Config] host is required',
    MONGODB_USER_REQUIRED: '[Notify App MongoDB Config] user name is required',
    MONGODB_PASSWORD_REQUIRED: '[Notify App MongoDB Config] user password is required',
    MONGODB_AUTH_DATABASE_REQUIRED: '[Notify App MongoDB Config] auth database name is required',

    // RABBITMQ
    RABBITMQ_HOST_REQUIRED: '[Notify App RabbitMQ Config] host is required',
    RABBITMQ_USER_REQUIRED: '[Notify App RabbitMQ Config] user name is required',
    RABBITMQ_PASSWORD_REQUIRED: '[Notify App RabbitMQ Config] user password is required',

    // SMTP
    SMTP_HOST_REQUIRED: '[Notify App SMTP Config] host is required',
    SMTP_USER_REQUIRED: '[Notify App SMTP Config] user name is required',
    SMTP_PASSWORD_REQUIRED: '[Notify App SMTP Config] user password is required',
  },
} as const;
