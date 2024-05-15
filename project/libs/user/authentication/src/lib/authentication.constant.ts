import { MessagesType } from '@project/shared/core';

export const AuthenticationMessage: MessagesType = {
  ERROR: {
    ALREADY_EXISTS: 'User already exists',
    NOT_FOUND: 'User not found',
    INCORRECT_CREDENTIALS: 'Incorrect user email/password',
    CANT_CREATE_TOKENS: 'Can`t get get a new access/refresh tokens',
  },
  SUCCESS: {
    LOGGED_IN: 'User logged in',
    CREATED: 'User has been successfully created',
    NEW_TOKENS: 'Successfully get a new access/refresh tokens'
  }
} as const;
