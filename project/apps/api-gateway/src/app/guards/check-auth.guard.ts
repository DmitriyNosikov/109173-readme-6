import { HttpService } from '@nestjs/axios';
import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { apiGatewayConfig } from '@project/api-gateway-config';

export class CheckAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,

    @Inject(apiGatewayConfig.KEY)
    private readonly config: ConfigType<typeof apiGatewayConfig>
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const authenticationServiceURL = this.config.authenticationServiceURL;
    const request = context.switchToHttp().getRequest();
    const { data } = await this.httpService.axiosRef.post(`${authenticationServiceURL}/check`, {}, {
      headers: {
        'Authorization': request.headers['authorization']
      }
    });

    request['user'] = data;

    return true;
  }
}
