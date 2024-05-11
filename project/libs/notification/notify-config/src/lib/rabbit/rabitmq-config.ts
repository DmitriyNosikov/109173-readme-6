import { ConfigType, registerAs } from '@nestjs/config'
import { plainToClass } from 'class-transformer';
import { ConfigEnvironment } from '@project/shared/core';
import { RabbitmqConfigSchema } from './rabitmq-config.schema';
import { DEFAULT_RABBITMQ_UI_PORT, DEFAULT_RAMMITMQ_PORT } from './rabitmq-config constant';

type PromisifiedConfig = Promise<ConfigType<typeof getConfig>>;

async function getConfig(): Promise<RabbitmqConfigSchema> {
  const rabbitmqPort = process.env.RABBITMQ_PORT || String(DEFAULT_RAMMITMQ_PORT);
  const rabbitmqUiPort = process.env.RABBITMQ_UI_PORT || String(DEFAULT_RABBITMQ_UI_PORT);

  const config = plainToClass(RabbitmqConfigSchema, {
    host: process.env.RABBITMQ_HOST,
    port: parseInt(rabbitmqPort, 10),
    uiPort: parseInt(rabbitmqUiPort, 10),
    user: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASSWORD,
    queue: process.env.RABBITMQ_QUEUE,
    exchange: process.env.RABBITMQ_EXCHANGE,
  })

  await config.validate();

  return config;
}

export default registerAs(ConfigEnvironment.NOTIFY_RABBITMQ, async (): PromisifiedConfig => {
  return getConfig();
})
