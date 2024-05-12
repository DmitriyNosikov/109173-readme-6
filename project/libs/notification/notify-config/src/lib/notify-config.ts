import { ConfigType, registerAs } from '@nestjs/config'
import { plainToClass } from 'class-transformer';
import { ConfigEnvironment } from '@project/shared/core';
import { NotifyConfigSchema } from './notify-config.schema';
import { DEFAULT_PORT } from './notify-config constant';

type PromisifiedConfig = Promise<ConfigType<typeof getConfig>>;

async function getConfig(): Promise<NotifyConfigSchema> {
  const port = process.env.PORT || String(DEFAULT_PORT);

  const config = plainToClass(NotifyConfigSchema, {
    host: process.env.HOST,
    port: parseInt(port, 10),
  })

  await config.validate();

  return config;
}

export default registerAs(ConfigEnvironment.NOTIFY, async (): PromisifiedConfig => {
  return getConfig();
})
