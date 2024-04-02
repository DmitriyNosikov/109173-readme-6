import { Module } from '@nestjs/common';
import { BlogUserModule } from '@project/blog-user'
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  // Импортируем модуль управления пользователями блога
  // для дальнейшей возможности пользоваться его провайдерами
  imports: [BlogUserModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService]
})
export class AuthenticationModule {}
