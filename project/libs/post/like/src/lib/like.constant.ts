import { MessagesType } from '@project/shared/core';

export const LikeMessage: MessagesType = {
  ERROR: {
    CANT_UPDATE: 'Can`t update Like. Possible reason: Object with fields to update are empty',
    UNAUTHORIZED: 'Like can be created only by authorized user',
    NOT_FOUND: 'Like not found. Possible reason: Request is incorrect or Database is empty'
  },
  SUCCESS: {
    FOUND: 'Like found',
    CREATED: 'Like has been successfully created',
    UPDATED: 'Like has been successfully updated',
    DELETED: 'Like has been successfully deleted',
  },
  DESCRIPTION: {
    SHOW: 'Show all likes by post id',
    SHOW_USER_LIKES: 'Show all user likes by id',
    TOGGLE: 'Toggle like',
    POST_ID: "Post ID",
  }
} as const;
