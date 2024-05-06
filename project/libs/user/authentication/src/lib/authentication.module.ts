import { Module } from '@nestjs/common';
import { BlogUserModule } from '@project/user/blog-user'
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { BCryptHasher } from '@project/shared/hasher'

import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWTConfigModule, getJWTOptions } from '@project/shared/configurations/jwt-config'
@Module({
  imports: [
    // Наш модуль для чтения настроек JWT из .env
    JWTConfigModule,

    // Модуль для работы с JWT-токенами
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJWTOptions,
    }),

    // Импортируем модуль управления пользователями блога
    // для дальнейшей возможности пользоваться его провайдерами
    BlogUserModule
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    {
      provide: 'Hasher',
      useClass: BCryptHasher
    }
  ]
})
export class AuthenticationModule {}
