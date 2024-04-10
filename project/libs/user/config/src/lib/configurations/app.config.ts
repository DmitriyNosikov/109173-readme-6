import { registerAs } from '@nestjs/config'
import { ConfigEnvironment, DEFAULT_PORT } from '../user-config.constant';

export interface DbConfig {
  host: string;
  port: number;
}

//TODO: Добавить валидацию конфига
function getConfig(): DbConfig {
  const port = process.env.PORT || String(DEFAULT_PORT);
  const config: DbConfig = {
    port: parseInt(port, 10),
    host: process.env.HOST,
  }

  return config;
}

export default registerAs(ConfigEnvironment.APP, getConfig)
