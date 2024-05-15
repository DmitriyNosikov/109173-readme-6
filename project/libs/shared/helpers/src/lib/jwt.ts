import { JwtModuleAsyncOptions } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { TokenPayloadInterface, UserInterface } from '@project/shared/core'

export function getJWTOptions(optionSpace?: string): JwtModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      return {
        secret: configService.get<string>(`${optionSpace}.accessTokenSecret`),
        signOptions: {
          expiresIn: configService.get<string>(`${optionSpace}.accessTokenExpiresIn`),
          algorithm: 'HS256',
        }
      };
    },
    inject: [ConfigService]
  }
}

export function getJWTPayload(user: UserInterface): TokenPayloadInterface {
  return {
    userId: user.id,
    email: user.email,
    firstname: user.firstName,
    lastname: user.lastName
  }
}
