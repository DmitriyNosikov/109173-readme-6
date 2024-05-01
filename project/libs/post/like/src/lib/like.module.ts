import { Module } from '@nestjs/common'
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { LikeRepository } from './like.repository';
import { LikeFactory } from './like.factory';

@Module({
  imports: [],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository, LikeFactory],
  exports: [LikeService]
})
export class LikeModule {}
