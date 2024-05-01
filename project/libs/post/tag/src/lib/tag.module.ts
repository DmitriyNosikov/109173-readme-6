import { Module } from '@nestjs/common'

import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TagRepository } from './tag.repository';
import { TagFactory } from './tag.factory';

@Module({
  imports: [],
  controllers: [TagController],
  providers: [TagService, TagRepository, TagFactory],
  exports: [TagService]
})
export class TagModule {}
