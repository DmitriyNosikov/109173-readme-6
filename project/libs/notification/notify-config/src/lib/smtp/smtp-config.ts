import { ConfigType, registerAs } from '@nestjs/config'
import { plainToClass } from 'class-transformer';
import { ConfigEnvironment } from '@project/shared/core';
import { SmtpConfigSchema } from './smtp-config.schema';
import { DEFAULT_SMTP_PORT } from './smtp-config constant';

type PromisifiedConfig = Promise<ConfigType<typeof getConfig>>;

async function getConfig(): Promise<SmtpConfigSchema> {
  const smtpPort = process.env.SMTP_PORT || String(DEFAULT_SMTP_PORT);

  const config = plainToClass(SmtpConfigSchema, {
    host: process.env.SMTP_HOST,
    port: parseInt(smtpPort, 10),
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM,
  })

  await config.validate();

  return config;
}

export default registerAs(ConfigEnvironment.NOTIFY_SMTP, async (): PromisifiedConfig => {
  return getConfig();
})
