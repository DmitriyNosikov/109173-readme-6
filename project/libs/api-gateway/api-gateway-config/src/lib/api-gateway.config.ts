import { ConfigType, registerAs } from '@nestjs/config'
import { plainToClass } from 'class-transformer';
import { ConfigEnvironment } from '@project/shared/core'
import { ApiGatewayConfigInterface, ApiGatewayConfigSchema } from './api-gateway-config.schema';
import { DEFAULT_PORT } from './api-gateway-config.constant';


type PromisifiedConfig = Promise<ConfigType<typeof getConfig>>;

async function getConfig(): Promise<ApiGatewayConfigInterface> {
  const port = process.env.PORT || String(DEFAULT_PORT);

  const config = plainToClass(ApiGatewayConfigSchema, {
    port: parseInt(port, 10),
    host: process.env.HOST,

    authenticationServiceURL: process.env.AUTHENTICATION_SERVICE_URL,
    userServiceURL: process.env.USER_SERVICE_URL,
    postServiceURL: process.env.POST_SERVICE_URL,
    commentServiceURL: process.env.COMMENT_SERVICE_URL,
    tagServiceURL: process.env.TAG_SERVICE_URL,
    notifyServiceURL: process.env.NOTIFY_SERVICE_URL,

    httpClientMaxRedirects: parseInt(process.env.HTTP_CLIENT_MAX_REDIRECTS, 10),
    httpClientMaxTimeout: parseInt(process.env.HTTP_CLIENT_TIMEOUT, 10),
  });

  await config.validate();

  return config;
}

export default registerAs(ConfigEnvironment.API_GATEWAY, async (): PromisifiedConfig => {
  return getConfig();
})
