import { registerAs } from '@nestjs/config'
import { ConfigEnvironment, DEFAULT_MONGODB_PORT } from '../config.constant';

export interface AppConfig {
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

//TODO: Добавить валидацию конфига
function getConfig(): AppConfig {
  const port = process.env.MONGODB_PORT || String(DEFAULT_MONGODB_PORT);
  const config: AppConfig = {
    port: parseInt(port, 10),
    host: process.env.MONGODB_HOST,
    name: process.env.MONGODB,
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
    authBase: process.env.MONGODB_AUTH_BASE
  }

  return config;
}

export default registerAs(ConfigEnvironment.DB, getConfig)
