import { ConfigType, registerAs } from '@nestjs/config'
import { plainToClass } from 'class-transformer';

import { PGADMIN_DEFAULT_PORT, POSTGRES_DEFAULT_PORT } from './postgres.constant';
import { ConfigEnvironment } from '@project/shared/core';
import { PostgresConfigSchema } from './postgres.schema';

type PromisifiedConfig = Promise<ConfigType<typeof getConfig>>;

export const PostgresConfigEnum = {
  POSTGRES_USER: 'pgUser',
  POSTGRES_PASSWORD: 'pgPassword',
  POSTGRES_DB_NAME: 'pgDbName',
  POSTGRES_PORT: 'pgPort',

  PGADMIN_DEFAULT_PORT: 'pgAdminDefaultPort',
  PGADMIN_DEFAULT_EMAIL: 'pgAdminDefaultEmail',
  PGADMIN_DEFAULT_PASSWORD: 'pgAdminDefaultPassword',
} as const;

async function getConfig(): Promise<PostgresConfigSchema> {
  const pgPort = process.env.POSTGRES_PORT || String(POSTGRES_DEFAULT_PORT);
  const pgAdminDefaultPort = process.env.MONGODB_EXPRESS_PORT || String(PGADMIN_DEFAULT_PORT);

  const config = plainToClass(PostgresConfigSchema, {
    pgPort: parseInt(pgPort, 10),
    pgPassword: process.env.POSTGRES_PASSWORD,
    pgDbName: process.env.POSTGRES_DB_NAME,

    pgAdminDefaultPort: parseInt(pgAdminDefaultPort, 10),
    pgAdminDefaultEmail:  process.env.PGADMIN_DEFAULT_EMAIL,
    pgAdminDefaultPassword:  process.env.PGADMIN_DEFAULT_PASSWORD
  })

  await config.validate();

  return config;
}

export default registerAs(ConfigEnvironment.DB, async (): PromisifiedConfig => {
  return getConfig();
})
