import { ConfigType, registerAs } from '@nestjs/config'
import { plainToClass } from 'class-transformer';
import { ConfigEnvironment } from '@project/shared/core'
import { JWTConfigInterface, JWTConfigSchema } from './jwt-config.schema';

type PromisifiedConfig = Promise<ConfigType<typeof getConfig>>;

async function getConfig(): Promise<JWTConfigInterface> {
  const config = plainToClass(JWTConfigSchema, {
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  });

  await config.validate();

  return config;
}

export default registerAs(ConfigEnvironment.USER_JWT, async (): PromisifiedConfig => {
  return getConfig();
})
