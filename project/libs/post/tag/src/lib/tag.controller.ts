import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common'
import { TagService } from './tag.service';
import { CreateTagDTO } from './dto/create-tag.dto';
import { fillDTO } from '@project/shared/helpers';
import { CreateTagRDO } from './rdo/create-tag.rdo';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, PartialType } from '@nestjs/swagger';
import { TagMessage } from './tag.constant';


@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor(
    private readonly tagService: TagService
  ){}

  @Post('/')
  @ApiOperation({ summary: TagMessage.DESCRIPTION.CREATE })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: TagMessage.SUCCESS.CREATED,
    type: CreateTagRDO
  })
  @ApiBody({
    type: CreateTagDTO
  })
  public async create(@Body() dto: CreateTagDTO) {
    const tag = await this.tagService.create(dto);

    return fillDTO(CreateTagRDO, tag.toPOJO());
  }

  @Get('/get-by-Id/:tagId')
  @ApiOperation({ summary: TagMessage.DESCRIPTION.SHOW_BY_ID })
  @ApiResponse({
    status: HttpStatus.OK,
    description: TagMessage.SUCCESS.FOUND,
    type: CreateTagRDO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TagMessage.ERROR.NOT_FOUND
  })
  @ApiQuery({
    name: 'tagId',
    required: true,
    example: '8f5e6982-d875-4dc8-8222-3b3e03f53b40'
  })
  public async getTagById(@Param('tagId') tagId: string) {
    const tag = await this.tagService.getById(tagId);

    return fillDTO(CreateTagRDO, tag);
  }

  @Get('/get-by-name/:tagName')
  @ApiOperation({ summary: TagMessage.DESCRIPTION.SHOW_BY_NAME })
  @ApiResponse({
    status: HttpStatus.OK,
    description: TagMessage.SUCCESS.FOUND,
    type: CreateTagRDO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TagMessage.ERROR.NOT_FOUND
  })
  @ApiQuery({
    name: 'tagName',
    required: true,
    example: 'headline'
  })
  public async getTagByName(@Param('tagName') tagName: string): Promise<CreateTagRDO> {
    const tag = await this.tagService.getByName(tagName);

    return fillDTO(CreateTagRDO, tag);
  }

  @Get('/get-by-names/')
  @ApiOperation({ summary: TagMessage.DESCRIPTION.INDEX_BY_NAMES })
  @ApiResponse({
    status: HttpStatus.OK,
    description: TagMessage.SUCCESS.FOUND,
    type: CreateTagRDO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TagMessage.ERROR.NOT_FOUND
  })
  @ApiParam({
    name: 'tagNames',
    required: true,
    type: [String],
    example: '[ "tag1", "tag2", "headline", "hot" ]'
  })
  public async getTagsByNames(@Body('tagNames') tagNames: string[]): Promise<CreateTagRDO[] | null> {
    const tags = await this.tagService.getByNames(tagNames);

    if(!tags) {
      return;
    }

    const result = tags.map((tag) => fillDTO(CreateTagRDO, tag));

    return result;
  }

  @Get('/get-or-create/')
  @ApiOperation({ summary: TagMessage.DESCRIPTION.GET_OR_CREATE })
  @ApiResponse({
    status: HttpStatus.OK,
    description: TagMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: TagMessage.SUCCESS.CREATED,
    type: CreateTagRDO
  })
  @ApiParam({
    name: 'tagNames',
    required: true,
    type: [String],
    example: '[ "tag1", "tag2", "headline", "hot" ]'
  })
  public async getOrCreate(@Body('tagNames') tagNames: string[]): Promise<CreateTagRDO> {
    const tags = await this.tagService.getOrCreate(tagNames);

    return fillDTO(CreateTagRDO, tags);
  }


  @Patch(':tagId')
  @ApiOperation({ summary: TagMessage.DESCRIPTION.UPDATE })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: TagMessage.SUCCESS.UPDATED
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TagMessage.ERROR.NOT_FOUND
  })
  @ApiParam({
    name: "tagId",
    required: true,
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: TagMessage.DESCRIPTION.POST_ID
  })
  @ApiBody({
    type: PartialType(CreateTagDTO)
  })
  public async update(@Param('tagId') tagId: string, @Body() updatedFields: Partial<CreateTagDTO>): Promise<CreateTagRDO> {
    const updatedTag = await this.tagService.update(tagId, updatedFields);

    if(!updatedTag) {
      return;
    }

    return fillDTO(CreateTagRDO, updatedTag.toPOJO());
  }

  @Delete(':tagId')
  @ApiOperation({ summary: TagMessage.DESCRIPTION.DELETE })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: TagMessage.SUCCESS.DELETED
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TagMessage.ERROR.NOT_FOUND
  })
  @ApiParam({
    name: "tagId",
    required: true,
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: TagMessage.DESCRIPTION.POST_ID
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('tagId') tagId: string): Promise<void> {
    await this.tagService.delete(tagId);
  }
}
