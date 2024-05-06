import { ApiResponse } from '@nestjs/swagger'
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus, Query, HttpCode } from '@nestjs/common';

import { CreateBasePostDTO } from './dto/create-base-post.dto'
import { UpdateBasePostDTO } from './dto/update-base-post.dto';
import { fillDTO } from '@project/shared/helpers';

import { BlogPostService } from './blog-post.service';
import { BlogPostMessage } from './blog-post.constant';
import { BlogPostQuery } from './blog-post.query';
import { BasePostWithPaginationRdo } from './rdo/base-post-with-pagination.rdo';
import { BasePostWithExtraFieldsRDO } from './rdo/base-post-with-extra-fields';

@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService
  ){}
  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogPostMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostMessage.ERROR.NOT_FOUND
  })
  @Get('/')
  public async index(@Query() query: BlogPostQuery) {
    const paginatedPosts = await this.blogPostService.getPaginatedPosts(query);
    const result = {
      ...paginatedPosts,
      entities: paginatedPosts.entities.map((post) => post.toPOJO())
    };

    return fillDTO(BasePostWithPaginationRdo, result);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogPostMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostMessage.ERROR.NOT_FOUND
  })
  @Get(':postId')
  public async show(@Param('postId') postId: string): Promise<BasePostWithExtraFieldsRDO | void> {
    const post = await this.blogPostService.findById(postId);

    return fillDTO(BasePostWithExtraFieldsRDO, post);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BlogPostMessage.SUCCESS.CREATED
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostMessage.ERROR.UNAUTHORIZED
  })
  // @UseGuards(JWTAuthGuard)
  @Post()
  public async create(@Body() dto: CreateBasePostDTO): Promise<BasePostWithExtraFieldsRDO | void> {
    const createdPost = await this.blogPostService.create(dto);

    return fillDTO(BasePostWithExtraFieldsRDO, createdPost);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BlogPostMessage.SUCCESS.UPDATED
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostMessage.ERROR.NOT_FOUND
  })
  // @UseGuards(JWTAuthGuard)
  @Patch(':postId')
  public async update(@Param('postId') postId: string, @Body() updatedFields: UpdateBasePostDTO) {
    const updatedPost = this.blogPostService.update(postId, updatedFields);

    return fillDTO(BasePostWithExtraFieldsRDO, updatedPost);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostMessage.SUCCESS.DELETED
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostMessage.ERROR.NOT_FOUND
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  // @UseGuards(JWTAuthGuard)
  @Delete(':postId')
  public async delete(@Param('postId') postId: string): Promise<void> {
    await this.blogPostService.delete(postId);
  }
}
