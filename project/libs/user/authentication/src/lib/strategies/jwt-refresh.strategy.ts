import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenPayload } from '@project/shared/core';
import { userJWTConfig } from '@project/user/user-config';
import { AuthenticationService } from '../authentication.service';


@Injectable()
export class JWTRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(userJWTConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof userJWTConfig>,

    private readonly authenticationService: AuthenticationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret
    });
  }

  public async validate(payload: TokenPayload) {
    return this.authenticationService.getUserByEmail(payload.email);
  }
}

