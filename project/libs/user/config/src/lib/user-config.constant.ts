import { MessagesType } from '@project/shared/core';

export const USERS_ENV_FILE_PATH = 'apps/user/user.env'
export const DEFAULT_PORT = 8000;

export const UserConfigMessage: MessagesType = {
  ERROR: {
    USER_APP_HOST_REQUIRED: '[User App Config] host name is required',
  },
} as const;