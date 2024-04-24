import { ApiResponse } from '@nestjs/swagger'
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus } from '@nestjs/common';
import { CreateBasePostDTO } from './dto/create-blog-post.dto'
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
  public async create(@Body() dto: CreateBasePostDTO): Promise<void> {
    const allPostRelation = await this.blogPostService.create(dto);

    console.log('RELATED POST: ', allPostRelation);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogPostMessage.SUCCESS.FOUND
  })
  @Get(':postId')
  public async show(@Param('postId') postId: string): Promise<void> {
    console.log('POST ID:', postId);
    throw new Error('Method not implemented yet');
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BlogPostMessage.SUCCESS.UPDATED
  })
  @Patch(':postId')
  public async update(@Param('postId') postId: string, @Body() updatedFields: Partial<CreateBasePostDTO>) {
    console.log('POST ID:', postId);
    console.log('UPDATED FIELDS:', updatedFields);
    throw new Error('Method not implemented yet');
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostMessage.SUCCESS.DELETED
  })
  @Delete(':postId')
  public async delete(@Param('postId') postId: string): Promise<void> {
    console.log('POST ID:', postId);
    throw new Error('Method not implemented yet');
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
  public async searct(@Body() title: string): Promise<void> {
    console.log('POST TITLE:', title);
    throw new Error('Method not implemented yet');
  }
}
