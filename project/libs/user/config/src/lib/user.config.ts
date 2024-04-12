import { ConfigType, registerAs } from '@nestjs/config'
import { plainToClass } from 'class-transformer';
import { ConfigEnvironment } from '@project/shared/core'
import { UserConfigSchema, UserConfigInterface } from './user-config.schema';
import { DEFAULT_DB_PORT, DEFAULT_DB_UI_PORT, DEFAULT_PORT } from './user-config.constant';

type PromisifiedConfig = Promise<ConfigType<typeof getConfig>>;

async function getConfig(): Promise<UserConfigInterface> {
  const port = process.env.PORT || String(DEFAULT_PORT);
  const db_port = process.env.DB_PORT || String(DEFAULT_DB_PORT);
  const db_ui_port = process.env.DB_UI_PORT || String(DEFAULT_DB_UI_PORT);

  const config = plainToClass(UserConfigSchema, {
    port: parseInt(port, 10),
    host: process.env.HOST,
    db_port: parseInt(db_port, 10),
    db_ui_port: parseInt(db_ui_port, 10),
  });

  await config.validate();

  return config;
}

export default registerAs(ConfigEnvironment.USER, async (): PromisifiedConfig => {
  return getConfig();
})
