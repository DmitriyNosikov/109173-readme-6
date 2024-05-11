import { ConfigType, registerAs } from '@nestjs/config'
import { plainToClass } from 'class-transformer';
import { ConfigEnvironment } from '@project/shared/core';
import { DEFAULT_MONGODB_EXPRESS_PORT, DEFAULT_MONGODB_PORT} from './mongodb-config.constant';
import { MongoDBConfigSchema } from './mongodb-config.schema';

type PromisifiedConfig = Promise<ConfigType<typeof getConfig>>;

async function getConfig(): Promise<MongoDBConfigSchema> {
  const dbPort = process.env.MONGODB_PORT || String(DEFAULT_MONGODB_PORT);
  const express_port = process.env.MONGODB_EXPRESS_PORT || String(DEFAULT_MONGODB_EXPRESS_PORT);

  const config = plainToClass(MongoDBConfigSchema, {
    // MONGODB
    host: process.env.MONGODB_HOST,
    port: parseInt(dbPort, 10),
    dbName: process.env.MONGODB,
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
    authDatabase: process.env.MONGODB_AUTH_DATABASE,
    express_port: parseInt(express_port, 10),
  })

  await config.validate();

  return config;
}

export default registerAs(ConfigEnvironment.NOTIFY_MONGODB, async (): PromisifiedConfig => {
  return getConfig();
})
