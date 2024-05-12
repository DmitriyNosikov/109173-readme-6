import { ConfigType, registerAs } from '@nestjs/config'
import { plainToClass } from 'class-transformer';

import { PGADMIN_DEFAULT_PORT, POSTGRES_DEFAULT_PORT } from './postgres-config.constant';
import { ConfigEnvironment } from '@project/shared/core';
import { PostgresConfigSchema } from './postgres-config.schema';

type PromisifiedConfig = Promise<ConfigType<typeof getConfig>>;

async function getConfig(): Promise<PostgresConfigSchema> {
  const pgPort = process.env.POSTGRES_PORT || String(POSTGRES_DEFAULT_PORT);
  const pgAdminDefaultPort = process.env.MONGODB_EXPRESS_PORT || String(PGADMIN_DEFAULT_PORT);

  const config = plainToClass(PostgresConfigSchema, {
    port: parseInt(pgPort, 10),
    dbName: process.env.POSTGRES_DB_NAME,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,

    pgAdminPort: parseInt(pgAdminDefaultPort, 10),
    pgAdminEmail:  process.env.PGADMIN_DEFAULT_EMAIL,
    pgAdminPassword:  process.env.PGADMIN_DEFAULT_PASSWORD
  })

  await config.validate();

  return config;
}

export default registerAs(ConfigEnvironment.DB, async (): PromisifiedConfig => {
  return getConfig();
})
