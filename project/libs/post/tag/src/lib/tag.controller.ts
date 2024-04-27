import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
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

  @Get('/get-by-Id/:tagId')
  public async getTagById(@Param('tagId') tagId: string) {
    const tag = await this.tagService.getById(tagId);

    return fillDTO(CreateTagRDO, tag);
  }

  @Get('/get-by-name/:tagName')
  public async getTagByName(@Param('tagName') tagName: string): Promise<CreateTagRDO> {
    const tag = await this.tagService.getByName(tagName);

    return fillDTO(CreateTagRDO, tag);
  }

  @Get('/get-by-names/')
  public async getTagsByNamse(@Body('tagNames') tagNames: string[]): Promise<CreateTagRDO> {
    const tag = await this.tagService.getByNames(tagNames);

    return fillDTO(CreateTagRDO, tag);
  }

  @Patch(':tagId')
  public async update(@Param('tagId') tagId: string, @Body() updatedFields: Partial<TagEntity>): Promise<CreateTagDTO> {
    const updatedTag = await this.tagService.update(tagId, updatedFields);

    if(!updatedTag) {
      return;
    }

    return fillDTO(CreateTagRDO, updatedTag.toPOJO());
  }

  @Delete(':tagId')
  public async delete(@Param('tagId') tagId: string): Promise<void> {
    await this.tagService.delete(tagId);
  }
}
