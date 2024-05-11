import { ConfigType, registerAs } from '@nestjs/config'
import { plainToClass } from 'class-transformer';
import { ConfigEnvironment } from '@project/shared/core'
import { UserConfigSchema, UserConfigInterface } from './user-config.schema';
import { DEFAULT_PORT } from './user-config.constant';

type PromisifiedConfig = Promise<ConfigType<typeof getConfig>>;

async function getConfig(): Promise<UserConfigInterface> {
  const port = process.env.PORT || String(DEFAULT_PORT);

  const config = plainToClass(UserConfigSchema, {
    port: parseInt(port, 10),
    host: process.env.HOST,
  });

  await config.validate();

  return config;
}

export default registerAs(ConfigEnvironment.USER, async (): PromisifiedConfig => {
  return getConfig();
})
