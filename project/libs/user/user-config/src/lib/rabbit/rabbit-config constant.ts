import { MessagesType } from '@project/shared/core';

export const RABBIT_ENV_FILE_PATH = 'apps/user/user.env'

export const DEFAULT_RAMMITMQ_PORT = 5672;
export const DEFAULT_RABBITMQ_UI_PORT = 1088;

export const RabbitMessage: MessagesType = {
  ERROR: {
    RABBITMQ_HOST_REQUIRED: '[RabbitMQ Config] host is required',
    RABBITMQ_USER_REQUIRED: '[RabbitMQ Config] user name is required',
    RABBITMQ_PASSWORD_REQUIRED: '[RabbitMQ Config] user password is required',

    VALIDATION: '[Notification Config] Validation failed. Errors: ',
  },
} as const;
