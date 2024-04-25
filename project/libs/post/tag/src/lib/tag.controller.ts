import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common'
import { TagService } from './tag.service';
import { CreateTagDTO } from './dto/create-tag.dto';
import { fillDTO } from '@project/shared/helpers';
import { CreateTagRDO } from './rdo/create-tag.rdo';
import { TagEntity } from './tag.entity';


@Controller('tags')
export class TagController {
  constructor(
    private readonly tagService: TagService
  ){}

  @Post('/')
  public async create(@Body() dto: CreateTagDTO) {
    const tag = await this.tagService.create(dto);

    return fillDTO(CreateTagRDO, tag.toPOJO());
  }

  @Patch(':tagId')
  async update(@Param('tagId') tagId: string, @Body() updatedFields: Partial<TagEntity>): Promise<CreateTagDTO> {
    const updatedTag = await this.tagService.update(tagId, updatedFields);

    if(!updatedTag) {
      return;
    }

    return fillDTO(CreateTagRDO, updatedTag.toPOJO());
  }

  @Delete(':tagId')
  async delete(@Param('tagId') tagId: string): Promise<void> {
    await this.tagService.delete(tagId);
  }
}
