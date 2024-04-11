import { MessagesType } from '@project/shared/core';


export const DEFAULT_MONGODB_PORT = 27017;
export const DEFAULT_MONGODB_EXPRESS_PORT = 8081;

export const MongoMessage: MessagesType = {
  ERROR: {
    MONGODB_DBNAME_REQUIRED: '[MongoDB Config] database name is required',
    MONGODB_HOST_REQUIRED: '[MongoDB Config] host name is required',
    MONGODB_USER_REQUIRED: '[MongoDB Config] user name is required',
    MONGODB_PASSWORD_REQUIRED: '[MongoDB Config] user password is required',
    MONGODB_AUTH_DATABASE_REQUIRED: '[MongoDB Config] auth database name is required',
    VALIDATION: '[User App Config] Validation failed. Errors: ',
  },
} as const;
