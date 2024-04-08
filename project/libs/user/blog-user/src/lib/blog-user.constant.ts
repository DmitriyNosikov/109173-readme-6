import { MessagesType } from '@project/shared/core';

export const BlogUserMessage: MessagesType = {
  ERROR: {
    ALREADY_EXISTS: 'User already exists',
    NOT_FOUND: 'User not found',
    INCORRECT_CREDENTIALS: 'Incorrect user email/password',
    CANT_UPDATE: 'Can`t update user. Possible reason: Object with fields to update are empty'
  },
  SUCCESS: {
    FOUND: 'User found',
    UPDATED: 'User has been successfully updated',
    DELETED: 'User has been successfully deleted',
  }
} as const;
