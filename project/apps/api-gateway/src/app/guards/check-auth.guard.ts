import { HttpService } from '@nestjs/axios';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigEnvironment } from '@project/shared/core';

export class CheckAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const authenticationServiceURL = this.configService.get<string>(`${ConfigEnvironment.API_GATEWAY}.authenticationServiceURL`)
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
