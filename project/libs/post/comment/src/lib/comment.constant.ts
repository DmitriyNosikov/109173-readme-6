import { MessagesType } from '@project/shared/core';

export const CommentMessage: MessagesType = {
  ERROR: {
    NOT_FOUND: 'Comment not found',
    CANT_UPDATE: 'Can`t update Comment. Possible reason: Object with fields to update are empty'
  },
  SUCCESS: {
    FOUND: 'Comment found',
    UPDATED: 'Comment has been successfully updated',
    DELETED: 'Comment has been successfully deleted',
  }
} as const;
