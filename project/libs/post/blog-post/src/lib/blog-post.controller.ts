import { ApiResponse } from '@nestjs/swagger'
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus } from '@nestjs/common';

import { CreateBasePostDTO } from './dto/create-base-post.dto'
import { CreatePostRDO } from './rdo/create-base-post.rdo';
import { UpdateBasePostDTO } from './dto/update-base-post.dto';
import { fillDTO } from '@project/shared/helpers';

import { BlogPostService } from './blog-post.service';
import { BlogPostMessage } from './blog-post.constant';


@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService
  ){}

  @ApiResponse({
    // type: UserRDO,
    status: HttpStatus.CREATED,
    description: BlogPostMessage.SUCCESS.CREATED
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostMessage.ERROR.UNAUTHORIZED
  })
  @Post()
  public async create(@Body() dto: CreateBasePostDTO): Promise<CreatePostRDO | void> {
    const createdPost = await this.blogPostService.create(dto);

    console.log('CREATED POST: ', createdPost);

    return fillDTO(CreatePostRDO, createdPost);
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
  public async show(@Param('postId') postId: string): Promise<CreatePostRDO | void> {
    const post = await this.blogPostService.findById(postId);

    return fillDTO(CreatePostRDO, post);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BlogPostMessage.SUCCESS.UPDATED
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostMessage.ERROR.NOT_FOUND
  })
  @Patch(':postId')
  public async update(@Param('postId') postId: string, @Body() updatedFields: UpdateBasePostDTO) {
    console.log('POST FIELDS TO UPDATE: ', updatedFields);
    const updatedPost = this.blogPostService.update(postId, updatedFields);

    return fillDTO(CreatePostRDO, updatedPost);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostMessage.SUCCESS.DELETED
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostMessage.ERROR.NOT_FOUND
  })
  @Delete(':postId')
  public async delete(@Param('postId') postId: string): Promise<void> {
    await this.blogPostService.delete(postId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogPostMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostMessage.ERROR.NOT_FOUND
  })
  @Post('search')
  public async search(@Body('title') title: string): Promise<void> {
    console.log('POST TITLE:', title);
    throw new Error('Method not implemented yet');
  }
}
