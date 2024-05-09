import { ConfigType, registerAs } from '@nestjs/config'
import { plainToClass } from 'class-transformer';
import { ConfigEnvironment } from '@project/shared/core';
import { RabbitConfigSchema } from './rabbit-config.schema';
import { DEFAULT_RABBITMQ_UI_PORT, DEFAULT_RAMMITMQ_PORT } from './rabbit-config constant';

type PromisifiedConfig = Promise<ConfigType<typeof getConfig>>;

async function getConfig(): Promise<RabbitConfigSchema> {
  const rabbitmqPort = process.env.RABBITMQ_PORT || String(DEFAULT_RAMMITMQ_PORT);
  const rabbitmqUiPort = process.env.RABBITMQ_UI_PORT || String(DEFAULT_RABBITMQ_UI_PORT);

  const config = plainToClass(RabbitConfigSchema, {
    rabbitmqHost: process.env.RABBITMQ_HOST,
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

export default registerAs(ConfigEnvironment.USER_RABBIT, async (): PromisifiedConfig => {
  return getConfig();
})
