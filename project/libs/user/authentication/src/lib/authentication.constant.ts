import { MessagesType } from '@project/shared/core';

export const AuthenticationMessage: MessagesType = {
  ERROR: {
    ALREADY_EXISTS: 'User already exists'
  }
} as const;
