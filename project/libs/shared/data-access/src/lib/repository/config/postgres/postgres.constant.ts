import { MessagesType } from '@project/shared/core';

export const POSTGRES_DEFAULT_PORT=5432
export const PGADMIN_DEFAULT_PORT=8082

export const PostgresConfigMessage: MessagesType = {
  ERROR: {
    POSTGRES_USER_REQUIRED: '[Postgres Config] postgres user name is required',
    POSTGRES_PASSWORD_REQUIRED: '[Postgres Config] postgres user password is required',
    POSTGRES_DBNAME_REQUIRED: '[Postgres Config] postgres database name is required',

    PGADMIN_DEFAULT_EMAIL_REQUIRED: '[PGAdmin Config] PGAdmin email is required',
    PGADMIN_DEFAULT_PASSWORD_REQUIRED: '[PGAdmin Config] PGAdmin password is required',

    VALIDATION: '[Postgres Config] Validation failed. Errors: '
  },
} as const;
