import { MessagesType } from '@project/shared/core';

export const BlogPostMessage: MessagesType = {
  ERROR: {
    POST_TYPE: 'Received invalid post type',
    CANT_UPDATE: 'Can`t update post. Possible reason: Object with fields to update are empty',
    UNAUTHORIZED: 'Post can be created only by authorized user',
    NOT_FOUND: 'Post not found',
  },
  SUCCESS: {
    FOUND: 'Post found',
    CREATED: 'Post has been successfully created',
    UPDATED: 'Post has been successfully updated',
    DELETED: 'Post has been successfully deleted',
  }
} as const;
