import { MessagesType } from '@project/shared/core';

export const CommentValidation = {
  MAX_COMMENTS_PER_PAGE: 50,
  DEFAULT_PAGE_NUMBER: 1,
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

    // PAGINATION
    LIMIT: '[Pagination] Limit posts count for 1 page',
    DEFAULT_LIMIT: `Default limit: ${CommentValidation.MAX_COMMENTS_PER_PAGE}`,

    PAGE: `[Pagination] Current page in pagination`,
    DEFAULT_PAGE: `Default page number: ${CommentValidation.DEFAULT_PAGE_NUMBER}`,
  }
} as const;
