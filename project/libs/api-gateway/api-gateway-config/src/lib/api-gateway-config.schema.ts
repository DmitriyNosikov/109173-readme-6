import { IsNumber, IsOptional, IsString, IsUrl, Max, Min, ValidationError, validateOrReject } from 'class-validator';
import { ApiGatewayConfigMessage, DEFAULT_HTTP_CLIENT_MAX_REDIRECTS, DEFAULT_HTTP_CLIENT_TIMEOUTS, DEFAULT_PORT } from './api-gateway-config.constant';
import { MAX_PORT, MIN_PORT } from '@project/shared/core';

export const ApiGatewayConfigEnum = {
  HOST: 'host',
  PORT: 'port',

  AUTHENTICATION_SERVICE_URL: 'authenticationServiceURL',
  USER_SERVICE_URL: 'userServiceURL',
  POST_SERVICE_URL: 'postServiceURL',
  COMMENT_SERVICE_URL: 'commentServiceURL',
  TAG_SERVICE_URL: 'tagServiceURL',
  NOTIFY_SERVICE_URL: 'notifyServiceURL',

  HTTP_CLIENT_MAX_REDIRECTS: 'httpClientMaxRedirects',
  HTTP_CLIENT_TIMEOUT: 'httpClientMaxTimeout',

} as const;

export interface ApiGatewayConfigInterface {
  [ApiGatewayConfigEnum.HOST]: string;
  [ApiGatewayConfigEnum.PORT]: number;

  [ApiGatewayConfigEnum.AUTHENTICATION_SERVICE_URL]: string;
  [ApiGatewayConfigEnum.USER_SERVICE_URL]: string;
  [ApiGatewayConfigEnum.POST_SERVICE_URL]: string;
  [ApiGatewayConfigEnum.COMMENT_SERVICE_URL]: string;
  [ApiGatewayConfigEnum.TAG_SERVICE_URL]: string;
  [ApiGatewayConfigEnum.NOTIFY_SERVICE_URL]: string;

  [ApiGatewayConfigEnum.HTTP_CLIENT_MAX_REDIRECTS]: number;
  [ApiGatewayConfigEnum.HTTP_CLIENT_TIMEOUT]: number;
}

export class ApiGatewayConfigSchema implements ApiGatewayConfigInterface {
  @IsString({ message: ApiGatewayConfigMessage.ERROR.USER_APP_HOST_REQUIRED })
  host: string;

  @IsNumber()
  @Max(MAX_PORT)
  @Min(MIN_PORT)
  @IsOptional()
  port: number = DEFAULT_PORT;

  @IsString({ message: ApiGatewayConfigMessage.ERROR.AUTHENTICATION_SERVICE_URL_REQUIRED })
  authenticationServiceURL: string;

  @IsString({ message: ApiGatewayConfigMessage.ERROR.USER_SERVICE_URL_REQUIRED })
  userServiceURL: string;

  @IsString({ message: ApiGatewayConfigMessage.ERROR.POST_SERVICE_URL_REQUIRED })
  postServiceURL: string;

  @IsString({ message: ApiGatewayConfigMessage.ERROR.COMMENT_SERVICE_URL_REQUIRED })
  commentServiceURL: string;

  @IsString({ message: ApiGatewayConfigMessage.ERROR.TAG_SERVICE_URL_REQUIRED })
  tagServiceURL: string;

  @IsString({ message: ApiGatewayConfigMessage.ERROR.NOTIFY_SERVICE_URL_REQUIRED })
  notifyServiceURL: string;

  @IsNumber()
  @IsOptional()
  httpClientMaxRedirects: number = DEFAULT_HTTP_CLIENT_MAX_REDIRECTS;

  @IsNumber()
  @IsOptional()
  httpClientMaxTimeout: number = DEFAULT_HTTP_CLIENT_TIMEOUTS;

  async validate() {
    return await validateOrReject(this).catch(errors => {
      console.log(ApiGatewayConfigMessage.ERROR.VALIDATION, errors);

      throw new ValidationError();
    });
  }
}
