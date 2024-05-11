import { MessagesType } from '@project/shared/core';

export const DEFAULT_RAMMITMQ_PORT = 5672;
export const DEFAULT_RABBITMQ_UI_PORT = 1088;

export const NotifyMessage: MessagesType = {
  ERROR: {
    // RABBITMQ
    RABBITMQ_HOST_REQUIRED: '[Notify App RabbitMQ Config] host is required',
    RABBITMQ_USER_REQUIRED: '[Notify App RabbitMQ Config] user name is required',
    RABBITMQ_PASSWORD_REQUIRED: '[Notify App RabbitMQ Config] user password is required',

  },
} as const;
