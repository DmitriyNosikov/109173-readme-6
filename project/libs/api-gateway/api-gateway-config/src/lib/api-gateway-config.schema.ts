import { IsNumber, IsOptional, IsString, IsUrl, ValidationError, validateOrReject } from 'class-validator';
import { ApiGatewayConfigMessage, DEFAULT_HTTP_CLIENT_MAX_REDIRECTS, DEFAULT_HTTP_CLIENT_TIMEOUTS } from './api-gateway-config.constant';

export const ApiGatewayConfigEnum = {
  AUTHENTICATION_SERVICE_URL: 'authenticationServiceURL',
  USER_SERVICE_URL: 'userServiceURL',
  POST_SERVICE_URL: 'postServiceURL',
  NOTIFY_SERVICE_URL: 'notifyServiceURL',

  HTTP_CLIENT_MAX_REDIRECTS: 'httpClientMaxRedirects',
  HTTP_CLIENT_TIMEOUT: 'httpClientMaxTimeout',

} as const;

export interface ApiGatewayConfigInterface {
  [ApiGatewayConfigEnum.AUTHENTICATION_SERVICE_URL]: string;
  [ApiGatewayConfigEnum.USER_SERVICE_URL]: string;
  [ApiGatewayConfigEnum.POST_SERVICE_URL]: string;
  [ApiGatewayConfigEnum.NOTIFY_SERVICE_URL]: string;

  [ApiGatewayConfigEnum.HTTP_CLIENT_MAX_REDIRECTS]: number;
  [ApiGatewayConfigEnum.HTTP_CLIENT_TIMEOUT]: number;
}

export class ApiGatewayConfigSchema implements ApiGatewayConfigInterface {
  @IsUrl()
  @IsString({ message: ApiGatewayConfigMessage.ERROR.AUTHENTICATION_SERVICE_URL_REQUIRED })
  authenticationServiceURL: string;

  @IsUrl()
  @IsString({ message: ApiGatewayConfigMessage.ERROR.USER_SERVICE_URL_REQUIRED })
  userServiceURL: string;

  @IsUrl()
  @IsString({ message: ApiGatewayConfigMessage.ERROR.POST_SERVICE_URL_REQUIRED })
  postServiceURL: string;

  @IsUrl()
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
