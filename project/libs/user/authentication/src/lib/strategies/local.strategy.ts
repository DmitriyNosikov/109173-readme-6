import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local';

import { BlogUserEntity } from '@project/user/blog-user';
import { AuthenticationService } from '../authentication.service';

const USERNAME_FIELD_NAME = 'email';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {
    super({ usernameField: USERNAME_FIELD_NAME  });
  }

  public async validate(email: string, password: string): Promise<BlogUserEntity> {
    return this.authenticationService.verify({ email, password} );
  }
}
