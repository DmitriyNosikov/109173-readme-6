import { ConfigType, registerAs } from '@nestjs/config'
import { plainToClass } from 'class-transformer';
import { ConfigEnvironment } from '@project/shared/core';
import { NotifConfigSchema } from './notif-config.schema';
import { DEFAULT_MONGODB_EXPRESS_PORT, DEFAULT_MONGODB_PORT, DEFAULT_RABBITMQ_UI_PORT, DEFAULT_RAMMITMQ_PORT } from './notif-config constant';

type PromisifiedConfig = Promise<ConfigType<typeof getConfig>>;

async function getConfig(): Promise<NotifConfigSchema> {
  const dbPort = process.env.MONGODB_PORT || String(DEFAULT_MONGODB_PORT);
  const express_port = process.env.MONGODB_EXPRESS_PORT || String(DEFAULT_MONGODB_EXPRESS_PORT);

  const rabbitmqPort = process.env.RABBITMQ_PORT || String(DEFAULT_RAMMITMQ_PORT);
  const rabbitmqUiPort = process.env.RABBITMQ_UI_PORT || String(DEFAULT_RABBITMQ_UI_PORT);

  const config = plainToClass(NotifConfigSchema, {
    // MONGODB
    dbPort: parseInt(dbPort, 10),
    dbHost: process.env.MONGODB_HOST,
    dbName: process.env.MONGODB,
    dbUser: process.env.MONGODB_USER,
    dbPassword: process.env.MONGODB_PASSWORD,
    authDatabase: process.env.MONGODB_AUTH_DATABASE,
    express_port: parseInt(express_port, 10),

    // RABBBITMQ
    rabbitmqPort: parseInt(rabbitmqPort, 10),
    rabbitmqUiPort: parseInt(rabbitmqUiPort, 10),
    rabbitmqUser: process.env.RABBITMQ_USER,
    rabbitmqPassword: process.env.RABBITMQ_PASSWORD,
    rabbitmqQueue: process.env.RABBITMQ_QUEUE,
    rabbitmqExchange: process.env.RABBITMQ_EXCHANGE,
  })

  await config.validate();

  return config;
}

export default registerAs(ConfigEnvironment.NOTIF, async (): PromisifiedConfig => {
  return getConfig();
})
