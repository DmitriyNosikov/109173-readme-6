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

  public async getByNames(tagNames: string[]): Promise<TagEntity[] | void> {
    tagNames = tagNames.map((tagName) => tagName.toLowerCase());

    const notFoundTags = [];
    const tags = await this.tagRepository.findByNames(tagNames);

    if(!tags) {
      return;
    }

    // Если нашли не все теги
    if(tags.length < tagNames.length) {
      const foundTags = tags.map((tag) => tag.name);

      tagNames.forEach((tag) => {
        if(!foundTags.includes(tag)) {
          notFoundTags.push(tag);
        }
      });

      if(notFoundTags.length > 0) {
        console.log('Not found tags: ', notFoundTags.join(', '));
      }
    }

    return tags;
  }

  public async create(dto: CreateTagDTO) {
    const tagEntity = this.tagFactory.create(dto);
    const tag = await this.tagRepository.create(tagEntity);

    return tag;
  }

  public async getOrCreate(tagNames: string[]) {
    const tags = [];

    for(const tagName of tagNames) {
      const tagEntity = this.tagFactory.create({ name: tagName });
      const tag = await this.tagRepository.create(tagEntity);

      tags.push(tag);
    }

    return tags;
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
