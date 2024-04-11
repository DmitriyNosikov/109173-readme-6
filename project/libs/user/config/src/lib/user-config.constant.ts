import { MessagesType } from '@project/shared/core';

export const USERS_ENV_FILE_PATH = 'apps/user/user.env'
export const DEFAULT_PORT = 8000;
export const DEFAULT_DB_PORT = 27017;
export const DEFAULT_DB_UI_PORT = 8081;

export const UserConfigMessage: MessagesType = {
  ERROR: {
    USER_APP_HOST_REQUIRED: '[User App Config] host name is required',
    VALIDATION: '[User App Config] Validation failed. Errors: '
  },
} as const;
