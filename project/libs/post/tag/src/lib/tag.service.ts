import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { omitUndefined } from '@project/shared/helpers';

import { CreateTagDTO } from './dto/create-tag.dto';
import { TagEntity } from './tag.entity';
import { TagFactory } from './tag.factory';
import { TagRepository } from './tag.repository';
import { TagMessage } from './tag.constant';

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly tagFactory: TagFactory,
  ){}

  async create(dto: CreateTagDTO) {
    const tagEntity = this.tagFactory.create(dto);
    const tag = await this.tagRepository.create(tagEntity);

    return tag;
  }

  async update(tagId: string, updatedFields: Partial<TagEntity>) {
    const isTagExists = await this.tagRepository.findById(tagId);

    if(!isTagExists) {
      throw new NotFoundException(`Tag with ID ${tagId} not found`);
    }

    updatedFields = omitUndefined(updatedFields);

    if(Object.keys(updatedFields).length <= 0) {
      throw new BadRequestException(TagMessage.ERROR.CANT_UPDATE);
    }

    const updatedTag = await this.tagRepository.updateById(tagId, updatedFields);

    return updatedTag;
  }

  async delete(tagId: string): Promise<void> {
    const isTagExists = await this.tagRepository.findById(tagId);

    if(!isTagExists) {
      throw new NotFoundException(`Tag with ID ${tagId} not found`);
    }

    await this.tagRepository.deleteById(tagId);
  }
}
