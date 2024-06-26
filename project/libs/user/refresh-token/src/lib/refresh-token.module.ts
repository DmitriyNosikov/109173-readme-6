import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenFactory } from './refresh-token.factory';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenModel, RefreshTokenSchema } from './refresh-token.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RefreshTokenModel.name, schema: RefreshTokenSchema }
    ])
  ],
  controllers: [],
  providers: [
    RefreshTokenFactory,
    RefreshTokenService,
    RefreshTokenRepository
  ],
  exports: [RefreshTokenService]
})
export class RefreshTokenModule {}
