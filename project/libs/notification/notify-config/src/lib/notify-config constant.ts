import { MessagesType } from '@project/shared/core';

export const NOTIFY_ENV_FILE_PATH = 'apps/notification/notification.env'

export const DEFAULT_PORT = 9000;

export const NotifyMessage: MessagesType = {
  ERROR: {
    // SERVER
    NOTIFY_APP_HOST_REQUIRED: '[Notify App Config] host is required',
    VALIDATION: '[Notification Config] Validation failed. Errors: ',
  },
} as const;
