import { MessagesType } from '@project/shared/core';

export const MIN_PORT = 0
export const MAX_PORT = 65535
export const DEFAULT_MONGODB_PORT = 27017;

export const MongoMessage: MessagesType = {
  ERROR: {
    MONGODB_NAME_REQUIRED: '[MongoDB Config] database name is required',
    MONGODB_HOST_REQUIRED: '[MongoDB Config] host name is required',
    MONGODB_USER_REQUIRED: '[MongoDB Config] user name is required',
    MONGODB_PASSWORD_REQUIRED: '[MongoDB Config] user password is required',
    MONGODB_AUTH_BASE_REQUIRED: '[MongoDB Config] auth base name is required',
  },
} as const;
