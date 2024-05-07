import { MessagesType } from '@project/shared/core';

export const CommentValidation = {
  TEXT: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 300
  },
};

export const CommentMessage: MessagesType = {
  ERROR: {
    UNAUTHORIZED: 'Comment can be created only by authorized user',
    CANT_UPDATE: 'Can`t update Comment. Possible reason: Object with fields to update are empty',
    NOT_FOUND: 'Comment not found. Possible reason: Request is incorrect or Database is empty'
  },
  SUCCESS: {
    FOUND: 'Comment found',
    CREATED: 'Comment has been successfully created',
    UPDATED: 'Comment has been successfully updated',
    DELETED: 'Comment has been successfully deleted',
  },
  DESCRIPTION: {
    INDEX: 'Show all posts by passed query',
    SHOW: 'Get detail info about comment by id',
    CREATE: 'Create new comment',
    UPDATE: 'Update exists comment by id',
    DELETE: 'Delete exists comment by id',
    POST_ID: "Post ID",
    COMMENT_ID: "Comment ID",
  }
} as const;
