import { ConfigType, registerAs } from '@nestjs/config'
import { plainToClass } from 'class-transformer';
import { ConfigEnvironment } from '@project/shared/core'
import { UserConfigSchema, UserConfigInterface } from './user-config.schema';
import { DEFAULT_MONGODB_EXPRESS_PORT, DEFAULT_MONGODB_PORT, DEFAULT_PORT } from './user-config.constant';

type PromisifiedConfig = Promise<ConfigType<typeof getConfig>>;

async function getConfig(): Promise<UserConfigInterface> {
  const port = process.env.PORT || String(DEFAULT_PORT);
  const mongodbPort = process.env.MONGODB_PORT || String(DEFAULT_MONGODB_PORT);
  const mongodbExpressPort = process.env.MONGODB_EXPRESS_PORT || String(DEFAULT_MONGODB_EXPRESS_PORT);

  const config = plainToClass(UserConfigSchema, {
    port: parseInt(port, 10),
    host: process.env.HOST,
    mongodbPort: parseInt(mongodbPort, 10),
    mongodbExpressPort: parseInt(mongodbExpressPort, 10),
  });

  await config.validate();

  return config;
}

export default registerAs(ConfigEnvironment.USER, async (): PromisifiedConfig => {
  return getConfig();
})
