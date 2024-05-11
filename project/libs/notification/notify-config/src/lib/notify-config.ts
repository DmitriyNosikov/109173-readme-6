import { ConfigType, registerAs } from '@nestjs/config'
import { plainToClass } from 'class-transformer';
import { ConfigEnvironment } from '@project/shared/core';
import { NotifyConfigSchema } from './notify-config.schema';
import { DEFAULT_MONGODB_EXPRESS_PORT, DEFAULT_MONGODB_PORT, DEFAULT_PORT, DEFAULT_RABBITMQ_UI_PORT, DEFAULT_RAMMITMQ_PORT, DEFAULT_SMTP_PORT } from './notify-config constant';

type PromisifiedConfig = Promise<ConfigType<typeof getConfig>>;

async function getConfig(): Promise<NotifyConfigSchema> {
  const port = process.env.PORT || String(DEFAULT_PORT);

  const dbPort = process.env.MONGODB_PORT || String(DEFAULT_MONGODB_PORT);
  const express_port = process.env.MONGODB_EXPRESS_PORT || String(DEFAULT_MONGODB_EXPRESS_PORT);

  const rabbitmqPort = process.env.RABBITMQ_PORT || String(DEFAULT_RAMMITMQ_PORT);
  const rabbitmqUiPort = process.env.RABBITMQ_UI_PORT || String(DEFAULT_RABBITMQ_UI_PORT);

  const smtpPort = process.env.SMTP_PORT || String(DEFAULT_SMTP_PORT);

  const config = plainToClass(NotifyConfigSchema, {
    host: process.env.HOST,
    port: parseInt(port, 10),

    // MONGODB
    dbPort: parseInt(dbPort, 10),
    dbHost: process.env.MONGODB_HOST,
    dbName: process.env.MONGODB,
    dbUser: process.env.MONGODB_USER,
    dbPassword: process.env.MONGODB_PASSWORD,
    authDatabase: process.env.MONGODB_AUTH_DATABASE,
    express_port: parseInt(express_port, 10),

    // RABBBITMQ
    rabbitmqHost: process.env.RABBITMQ_HOST,
    rabbitmqPort: parseInt(rabbitmqPort, 10),
    rabbitmqUiPort: parseInt(rabbitmqUiPort, 10),
    rabbitmqUser: process.env.RABBITMQ_USER,
    rabbitmqPassword: process.env.RABBITMQ_PASSWORD,
    rabbitmqQueue: process.env.RABBITMQ_QUEUE,
    rabbitmqExchange: process.env.RABBITMQ_EXCHANGE,

    // SMTP
    smtpHost: process.env.SMTP_HOST,
    smtpPort: parseInt(smtpPort, 10),
    smtpUser: process.env.SMTP_USER,
    smtpPassword: process.env.SMTP_PASSWORD,
    smtpFrom: process.env.SMTP_FROM,
  })

  await config.validate();

  return config;
}

export default registerAs(ConfigEnvironment.NOTIFY, async (): PromisifiedConfig => {
  return getConfig();
})
