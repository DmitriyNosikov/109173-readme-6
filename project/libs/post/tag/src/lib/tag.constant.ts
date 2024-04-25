import { MessagesType } from '@project/shared/core';

export const TagMessage: MessagesType = {
  ERROR: {
    CANT_UPDATE: 'Can`t update Tag. Possible reason: Object with fields to update are empty'
  },
  SUCCESS: {
    FOUND: 'Tag found',
    UPDATED: 'Tag has been successfully updated',
    DELETED: 'Tag has been successfully deleted',
  }
} as const;
