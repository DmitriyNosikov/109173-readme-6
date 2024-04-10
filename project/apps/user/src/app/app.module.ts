import { Module } from '@nestjs/common';

import { UserConfigModule } from '@project/config'
import { AuthenticationModule } from '@project/authentication';
import { BlogUserModule } from '@project/blog-user';
@Module({
  imports: [
    UserConfigModule,
    AuthenticationModule,
    BlogUserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
