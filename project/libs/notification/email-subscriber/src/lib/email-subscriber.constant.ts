import { MessagesType } from '@project/shared/core';

export const SubscriberValidation = {
  FIRST_NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50
  },
  LAST_NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50
  }
}

export const SubscriberMessage: MessagesType = {
  ERROR: {
    ALREADY_EXISTS: 'Subscriber already exists',
    NOT_FOUND: 'Subscriber not found',
    INCORRECT_CREDENTIALS: 'Incorrect Subscriber email/password',
    CANT_UPDATE: 'Can`t update Subscriber. Possible reason: Object with fields to update are empty',
    ENTITY_NOT_FOUND: 'Entity doesn`t exists in this repository'
  },
  SUCCESS: {
    FOUND: 'Subscriber found',
    CREATED: 'Subscriber has been successfully created',
    UPDATED: 'Subscriber has been successfully updated',
    DELETED: 'Subscriber has been successfully deleted',
  }
} as const;
