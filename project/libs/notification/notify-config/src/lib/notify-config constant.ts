import { MessagesType } from '@project/shared/core';

export const NOTIFY_ENV_FILE_PATH = 'apps/notification/notification.env'

export const DEFAULT_PORT = 9000;

export const DEFAULT_MONGODB_PORT = 27020;
export const DEFAULT_MONGODB_EXPRESS_PORT = 8083;

export const DEFAULT_RAMMITMQ_PORT = 5672;
export const DEFAULT_RABBITMQ_UI_PORT = 1088;

export const NotifyMessage: MessagesType = {
  ERROR: {
    NOTIFY_APP_HOST_REQUIRED: '[Notify App Config] host is required',

    MONGODB_DBNAME_REQUIRED: '[MongoDB Config] database name is required',
    MONGODB_HOST_REQUIRED: '[MongoDB Config] host is required',
    MONGODB_USER_REQUIRED: '[MongoDB Config] user name is required',
    MONGODB_PASSWORD_REQUIRED: '[MongoDB Config] user password is required',
    MONGODB_AUTH_DATABASE_REQUIRED: '[MongoDB Config] auth database name is required',

    RABBITMQ_HOST_REQUIRED: '[RabbitMQ Config] host is required',
    RABBITMQ_USER_REQUIRED: '[RabbitMQ Config] user name is required',
    RABBITMQ_PASSWORD_REQUIRED: '[RabbitMQ Config] user password is required',

    VALIDATION: '[Notification Config] Validation failed. Errors: ',
  },
} as const;
