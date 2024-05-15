import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { RefreshTokenPayloadInterface } from '@project/shared/core';
import { userJWTConfig } from '@project/user/user-config';

import { AuthenticationService } from '../authentication.service';
import { RefreshTokenService, TokenNotExistsException } from '@project/refresh-token';


@Injectable()
export class JWTRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(userJWTConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof userJWTConfig>,

    private readonly authenticationService: AuthenticationService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret
    });
  }

  public async validate(payload: RefreshTokenPayloadInterface) {
    const isTokenExists = await this.refreshTokenService.exists(payload.tokenId);

    if(!isTokenExists) {
      throw new TokenNotExistsException(payload.tokenId);
    }

    await this.refreshTokenService.deleteRefreshSession(payload.tokenId)

    return this.authenticationService.getUserByEmail(payload.email);
  }
}

