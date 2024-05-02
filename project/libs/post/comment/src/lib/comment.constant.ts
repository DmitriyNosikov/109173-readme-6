import { MessagesType } from '@project/shared/core';

export const CommentValidation = {
  TEXT: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 300
  },
};

export const CommentMessage: MessagesType = {
  ERROR: {
    CANT_UPDATE: 'Can`t update Comment. Possible reason: Object with fields to update are empty'
  },
  SUCCESS: {
    FOUND: 'Comment found',
    UPDATED: 'Comment has been successfully updated',
    DELETED: 'Comment has been successfully deleted',
  }
} as const;
