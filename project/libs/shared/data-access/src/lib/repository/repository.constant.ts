import { MessagesType } from '@project/shared/core';

export const RepositoryMessage: MessagesType = {
  ERROR: {
    ENTITY_NOT_FOUND: 'Entity doesn`t exists in this repository'
  }
} as const;
