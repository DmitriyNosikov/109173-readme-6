import { MessagesType } from '@project/shared/core';

export const JWT_ENV_FILE_PATH = 'apps/user/user.env';
export const JWT_ACCESS_TOKEN_EXPIRES_IN = '5m';
export const JWT_REFRESH_TOKEN_EXPIRES_IN = '30d';

export const JWTConfigMessage: MessagesType = {
  ERROR: {
    JWT_ACCESS_TOKEN_SECRET_REQUIRED: '[JWT Config] JWT Access token secret is required',
    JWT_REFRESH_TOKEN_SECRET_REQUIRED: '[JWT Config] JWT Refresh token secret is required ',
    VALIDATION: '[JWT Config] Validation failed. Errors: '
  },
} as const;
