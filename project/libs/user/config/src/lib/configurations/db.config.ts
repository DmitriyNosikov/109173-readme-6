import { ConfigType, registerAs } from '@nestjs/config'
import { ConfigEnvironment, DEFAULT_MONGODB_PORT } from '../user-config.constant';
import { MongoConfig } from '@project/shared/data-access'
import { plainToClass } from 'class-transformer';

type PromisifiedConfig = Promise<ConfigType<typeof getConfig>>;

export interface DbConfig {
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

//TODO: Добавить валидацию конфига
async function getConfig(): Promise<MongoConfig> {
  const port = process.env.MONGODB_PORT || String(DEFAULT_MONGODB_PORT);
  const config = plainToClass(MongoConfig, {
    port: parseInt(port, 10),
    host: process.env.MONGODB_HOST,
    name: process.env.MONGODB,
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
    authBase: process.env.MONGODB_AUTH_BASE
  })

  await config.validate();

  return config;
}

export default registerAs(ConfigEnvironment.DB, async (): PromisifiedConfig => {
  return getConfig();
})
