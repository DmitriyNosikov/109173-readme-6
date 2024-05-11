import { MessagesType } from '@project/shared/core';

export const DEFAULT_MONGODB_PORT = 27020;
export const DEFAULT_MONGODB_EXPRESS_PORT = 8083;

export const MongoDBMessage: MessagesType = {
  ERROR: {
    MONGODB_DBNAME_REQUIRED: '[Notify App MongoDB Config] database name is required',
    MONGODB_HOST_REQUIRED: '[Notify App MongoDB Config] host is required',
    MONGODB_USER_REQUIRED: '[Notify App MongoDB Config] user name is required',
    MONGODB_PASSWORD_REQUIRED: '[Notify App MongoDB Config] user password is required',
    MONGODB_AUTH_DATABASE_REQUIRED: '[Notify App MongoDB Config] auth database name is required',
  },
} as const;
