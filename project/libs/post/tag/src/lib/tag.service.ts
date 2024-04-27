import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
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

  public async getById(tagId: string) {
    const tag = await this.exists(tagId);

    return tag;
  }

  public async getByName(tagName: string) {
    const tag = await this.tagRepository.findByName(tagName.toLowerCase());

    if(!tag) {
      throw new NotFoundException(`Tag ${tagName} not found`);
    }

    return tag;
  }

  public async create(dto: CreateTagDTO) {
    const isTagExists = await this.tagRepository.findByName(dto.name.toLowerCase())

    if(isTagExists) {
      throw new ConflictException(`Tag with name ${dto.name} already exists`);
    }

    const tagEntity = this.tagFactory.create(dto);
    const tag = await this.tagRepository.create(tagEntity);

    return tag;
  }

  public async update(tagId: string, updatedFields: Partial<TagEntity>) {
    await this.exists(tagId);

    updatedFields = omitUndefined(updatedFields);

    if(Object.keys(updatedFields).length <= 0) {
      throw new BadRequestException(TagMessage.ERROR.CANT_UPDATE);
    }

    if(updatedFields.name) {
      updatedFields.name = updatedFields.name.toLowerCase();
    }

    const updatedTag = await this.tagRepository.updateById(tagId, updatedFields);

    return updatedTag;
  }

  public async delete(tagId: string): Promise<void> {
    await this.exists(tagId);
    await this.tagRepository.deleteById(tagId);
  }

  public async exists(tagId: string): Promise<TagEntity | void> {
    const isTagExists = await this.tagRepository.findById(tagId);

    if(!isTagExists) {
      throw new NotFoundException(`Tag with ID ${tagId} not found`);
    }

    return isTagExists;
  }
}
