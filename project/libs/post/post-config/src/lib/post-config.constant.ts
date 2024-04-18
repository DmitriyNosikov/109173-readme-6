import { MessagesType } from '@project/shared/core';

export const POSTS_ENV_FILE_PATH = 'apps/post/post.env'
export const DEFAULT_PORT = 9000;

export const PostConfigMessage: MessagesType = {
  ERROR: {
    POST_APP_HOST_REQUIRED: '[Post App Config] host name is required',

    VALIDATION: '[Post App Config] Validation failed. Errors: '
  },
} as const;
