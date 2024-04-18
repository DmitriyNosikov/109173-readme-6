import { ConfigType, registerAs } from '@nestjs/config'
import { plainToClass } from 'class-transformer';
import { ConfigEnvironment } from '@project/shared/core'

import { DEFAULT_PORT } from './post-config.constant';
import { PostConfigInterface, PostConfigSchema } from './post-config.schema';

export const PostConfigEnum = {
  HOST: 'host',
  PORT: 'port',
} as const;


type PromisifiedConfig = Promise<ConfigType<typeof getConfig>>;

async function getConfig(): Promise<PostConfigInterface> {
  const port = process.env.PORT || String(DEFAULT_PORT);

  const config = plainToClass(PostConfigSchema, {
    port: parseInt(port, 10),
    host: process.env.HOST
  });

  await config.validate();

  return config;
}

export default registerAs(ConfigEnvironment.POST, async (): PromisifiedConfig => {
  return getConfig();
})
