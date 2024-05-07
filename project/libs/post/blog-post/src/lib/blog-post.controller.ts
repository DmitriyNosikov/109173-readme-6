import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus, Query, HttpCode } from '@nestjs/common';

import { CreateBasePostDTO } from './dto/create-base-post.dto'
import { UpdateBasePostDTO } from './dto/update-base-post.dto';
import { fillDTO } from '@project/shared/helpers';

import { BlogPostService } from './blog-post.service';
import { BlogPostMessage } from './blog-post.constant';
import { BlogPostQuery } from './blog-post.query';
import { BasePostWithPaginationRDO } from './rdo/base-post-with-pagination.rdo';
import { BasePostWithExtraFieldsRDO } from './rdo/base-post-with-extra-fields';
import { SortDirection, SortType } from '@project/shared/core';

@ApiTags('posts')
@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService
  ){}
  @Get('/')
  @ApiOperation({ summary: BlogPostMessage.DESCRIPTION.INDEX })
  @ApiQuery({
    name: "title",
    description: BlogPostMessage.DESCRIPTION.POST_TITLE,
    example: "/?title=headline",
    required: false
  })
  @ApiQuery({
    name: "tags",
    description: BlogPostMessage.DESCRIPTION.POST_TAGS,
    example: "/?tags[]=tag1&tags[]=tag2",
    required: false
  })
  @ApiQuery({
    name: "limit",
    description: `${BlogPostMessage.DESCRIPTION.LIMIT}. ${BlogPostMessage.DESCRIPTION.DEFAULT_LIMIT}`,
    example: "/?limit=10",
    required: false
  })
  @ApiQuery({
    name: "page",
    description: `${BlogPostMessage.DESCRIPTION.LIMIT}. ${BlogPostMessage.DESCRIPTION.DEFAULT_PAGE_NUMBER}`,
    example: "/?limit=10",
    required: false
  })
  @ApiQuery({
    name: "sortType",
    description: `${BlogPostMessage.DESCRIPTION.LIMIT}. ${BlogPostMessage.DESCRIPTION.DEFAULT_SORT_TYPE}`,
    enum: SortType,
    example: "/?sortType=createdAt",
    required: false
  })
  @ApiQuery({
    name: "sortDirection",
    description: `${BlogPostMessage.DESCRIPTION.LIMIT}. ${BlogPostMessage.DESCRIPTION.DEFAULT_SORT_DIRECTION}`,
    enum: SortDirection,
    example: "/?sortDirection=desc",
    required: false
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogPostMessage.SUCCESS.FOUND,
    type: BasePostWithPaginationRDO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostMessage.ERROR.NOT_FOUND
  })
  public async index(@Query() query: BlogPostQuery): Promise<BasePostWithPaginationRDO | null> {
    const paginatedPosts = await this.blogPostService.getPaginatedPosts(query);
    const result = {
      ...paginatedPosts,
      entities: paginatedPosts.entities.map((post) => post.toPOJO())
    };

    return fillDTO(BasePostWithPaginationRDO, result);
  }

  @Get(':postId')
  @ApiOperation({ summary: BlogPostMessage.DESCRIPTION.SHOW })
  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogPostMessage.SUCCESS.FOUND,
    type: BasePostWithExtraFieldsRDO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostMessage.ERROR.NOT_FOUND
  })
  @ApiParam({
    name: "postId",
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: BlogPostMessage.DESCRIPTION.POST_ID,
    required: true
  })
  public async show(@Param('postId') postId: string): Promise<BasePostWithExtraFieldsRDO | void> {
    const post = await this.blogPostService.findById(postId);

    return fillDTO(BasePostWithExtraFieldsRDO, post);
  }

  @Post('/')
  // @UseGuards(JWTAuthGuard)
  @ApiOperation({ summary: BlogPostMessage.DESCRIPTION.CREATE })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BlogPostMessage.SUCCESS.CREATED,
    type: BasePostWithExtraFieldsRDO
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostMessage.ERROR.UNAUTHORIZED
  })
  @ApiBody({
    type: CreateBasePostDTO,
    required: true
  })
  public async create(@Body() dto: CreateBasePostDTO): Promise<BasePostWithExtraFieldsRDO | void> {
    const createdPost = await this.blogPostService.create(dto);

    return fillDTO(BasePostWithExtraFieldsRDO, createdPost);
  }

  // @UseGuards(JWTAuthGuard)
  @Patch(':postId')
  @ApiOperation({ summary: BlogPostMessage.DESCRIPTION.UPDATE })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BlogPostMessage.SUCCESS.UPDATED,
    type: BasePostWithExtraFieldsRDO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostMessage.ERROR.NOT_FOUND
  })
  @ApiParam({
    name: "postId",
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: BlogPostMessage.DESCRIPTION.POST_ID,
    required: true
  })
  @ApiBody({
    type: UpdateBasePostDTO
  })
  public async update(@Param('postId') postId: string, @Body() updatedFields: UpdateBasePostDTO) {
    const updatedPost = this.blogPostService.update(postId, updatedFields);

    return fillDTO(BasePostWithExtraFieldsRDO, updatedPost);
  }

  // @UseGuards(JWTAuthGuard)
  @Delete(':postId')
  @ApiOperation({ summary: BlogPostMessage.DESCRIPTION.DELETE })
  @ApiParam({
    name: "postId",
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: BlogPostMessage.DESCRIPTION.POST_ID,
    required: true
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostMessage.SUCCESS.DELETED
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostMessage.ERROR.NOT_FOUND
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('postId') postId: string): Promise<void> {
    await this.blogPostService.delete(postId);
  }
}
