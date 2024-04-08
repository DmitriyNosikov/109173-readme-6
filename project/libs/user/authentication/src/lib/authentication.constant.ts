import { MessagesType } from '@project/shared/core';

export const AuthenticationMessage: MessagesType = {
  ERROR: {
    ALREADY_EXISTS: 'User already exists',
    NOT_FOUND: 'User not found',
    INCORRECT_CREDENTIALS: 'Incorrect user email/password',
  },
  SUCCESS: {
    LOGGED_IN: 'User logged in',
    CREATED: 'User has been successfully created',
  }
} as const;
