import { MessagesType } from '@project/shared/core';

export const API_GATEWAY_ENV_FILE_PATH = 'apps/api-gateway/api-gateway.env'

export const DEFAULT_PORT = 11000;
export const DEFAULT_HTTP_CLIENT_MAX_REDIRECTS = 5;
export const DEFAULT_HTTP_CLIENT_TIMEOUTS = 3000;


export const ApiGatewayConfigMessage: MessagesType = {
  ERROR: {
    API_GATEWAY_APP_HOST_REQUIRED: '[Api-gateway App Config] host is required',

    AUTHENTICATION_SERVICE_URL_REQUIRED: '[Api-gateway App Config] Authentication service url is required',
    USER_SERVICE_URL_REQUIRED: '[Api-gateway App Config] User service url is required',
    POST_SERVICE_URL_REQUIRED: '[Api-gateway App Config] Post service url is required',
    NOTIFY_SERVICE_URL_REQUIRED: '[Api-gateway App Config] Notification service url is required',

    VALIDATION: '[Api-gateway App Config] Validation failed. Errors: '
  },
} as const;
