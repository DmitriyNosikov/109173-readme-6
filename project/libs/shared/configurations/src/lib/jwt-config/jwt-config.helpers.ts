import { ConfigService } from '@nestjs/config';
import { ConfigEnvironment } from '@project/shared/core';
import { JWTConfigEnum } from './jwt-config.schema';
import { JwtModuleOptions } from '@nestjs/jwt';

export async function getJWTOptions(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>(`${ConfigEnvironment.JWT}.${JWTConfigEnum.JWT_ACCESS_TOKEN_SECRET}`),
    signOptions: {
      expiresIn: configService.get<string>(`${ConfigEnvironment.JWT}.${JWTConfigEnum.JWT_ACCESS_TOKEN_EXPIRES_IN}`),
      algorithm: 'HS256',
    }
  };
}
