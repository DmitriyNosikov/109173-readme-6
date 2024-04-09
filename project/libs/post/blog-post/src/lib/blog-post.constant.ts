import { MessagesType } from '@project/shared/core';

export const BlogPostMessage: MessagesType = {
  ERROR: {
    POST_TYPE: 'Received invalid post type',
  },
} as const;
