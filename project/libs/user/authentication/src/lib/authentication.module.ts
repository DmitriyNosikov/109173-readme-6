import { Module } from '@nestjs/common';
import { BlogUserModule } from '@project/user/blog-user';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { BCryptHasher } from '@project/shared/hasher'

import { UserNotifyModule } from '@project/user/user-notify';

import { JwtModule } from '@nestjs/jwt';
import { getJWTOptions } from '@project/shared/helpers';
import { JWTAccessStrategy } from './strategies/jwt-access.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigEnvironment } from '@project/shared/core';
@Module({
  imports: [
    // Импортируем модуль управления пользователями блога
    // для дальнейшей возможности пользоваться его провайдерами
    BlogUserModule,

    // Модуль для работы с уведомлениями
    UserNotifyModule,

    // Модуль для работы с JWT-токенами
    JwtModule.registerAsync(
      getJWTOptions(ConfigEnvironment.USER_JWT)
    )
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,

    // Стратегии авторизации (PassportJS)
    JWTAccessStrategy,
    LocalStrategy,

    // Инжектируем модуль для работы с хешированием
    {
      provide: 'Hasher',
      useClass: BCryptHasher
    }
  ]
})
export class AuthenticationModule {}
