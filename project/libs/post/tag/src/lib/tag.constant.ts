import { MessagesType } from '@project/shared/core';

export const TagMessage: MessagesType = {
  ERROR: {
    CANT_UPDATE: 'Can`t update Tag. Possible reason: Object with fields to update are empty',
    NOT_FOUND: 'Tags not found. Possible reason: Request is incorrect or Database is empty'
  },
  SUCCESS: {
    FOUND: 'Tag found',
    CREATED: 'Tag has been successfully created',
    UPDATED: 'Tag has been successfully updated',
    DELETED: 'Tag has been successfully deleted',
  },
  DESCRIPTION: {
    INDEX_BY_NAMES: 'Show all tags by passed tag names',
    SHOW_BY_ID: 'Get detail info about tag by tag id',
    SHOW_BY_NAME: 'Get detail info about tag by tag name',
    GET_OR_CREATE: 'Get tag by tag name or create new, if it not exists',
    CREATE: 'Create new tag by tag id',
    UPDATE: 'Update exists tag by tag id',
    DELETE: 'Delete exists tag by tag id',
    TAG_ID: "Tag ID"
  }
} as const;
