import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus, Query, HttpCode, BadRequestException } from '@nestjs/common';

import { CreateBasePostDTO } from './dto/create-base-post.dto'
import { UpdateBasePostDTO } from './dto/update-base-post.dto';
import { fillDTO } from '@project/shared/helpers';

import { BlogPostService } from './blog-post.service';
import { BlogPostMessage } from './blog-post.constant';
import { BlogPostQuery } from './types/queries/blog-post.query';
import { BasePostWithPaginationRDO } from './rdo/base-post-with-pagination.rdo';
import { BasePostWithExtraFieldsRDO } from './rdo/base-post-with-extra-fields';
import { SortDirection, SortType } from '@project/shared/core';
import { GetPostsListQuery } from './types/queries/get-posts-list.query';
import { SearchPostsQuery } from './types/queries/search-posts.query';

@ApiTags('posts')
@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService
  ){}

  // Получение списка публикаций (ТЗ п.3)
  @Get('/')
  @ApiOperation({ summary: BlogPostMessage.DESCRIPTION.LIST })
  @ApiQuery({
    name: "tag",
    description: BlogPostMessage.DESCRIPTION.POST_TAG,
    example: "/?tag=headline",
    required: false
  })
  @ApiQuery({
    name: "authorId",
    description: BlogPostMessage.DESCRIPTION.AUTHOR_ID,
    example: "/?authorId=66224f68a3f9a165a1ab5fbd",
    required: false
  })
  @ApiQuery({
    name: "limit",
    description: `${BlogPostMessage.DESCRIPTION.LIMIT}. ${BlogPostMessage.DESCRIPTION.DEFAULT_POSTS_LIST_LIMIT}`,
    example: "/?limit=10",
    required: false
  })
  @ApiQuery({
    name: "page",
    description: `${BlogPostMessage.DESCRIPTION.PAGE}. ${BlogPostMessage.DESCRIPTION.DEFAULT_PAGE}`,
    example: "/?page=1",
    required: false
  })
  @ApiQuery({
    name: "sortType",
    description: `${BlogPostMessage.DESCRIPTION.SORT_TYPE}. ${BlogPostMessage.DESCRIPTION.DEFAULT_SORT_TYPE}`,
    enum: SortType,
    example: "/?sortType=createdAt",
    required: false
  })
  @ApiQuery({
    name: "sortDirection",
    description: `${BlogPostMessage.DESCRIPTION.SORT_DIRECTION}. ${BlogPostMessage.DESCRIPTION.DEFAULT_SORT_DIRECTION}`,
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
  public async getList(@Query() query: GetPostsListQuery, isPublished = true): Promise<BasePostWithPaginationRDO | null> {
    const searchQuery: BlogPostQuery = fillDTO(GetPostsListQuery, query);

    // Возможность использовать данный метод для поска по черновикам
    searchQuery.isPublished = isPublished;

    // Искать можно только по одному тегу за раз
    if(query?.tag) {
      searchQuery.tags = [query.tag]
    }

    const foundPosts = await this.index(searchQuery);

    return foundPosts;
  }

  // Черновики авторизованного пользователя
  @Get('drafts')
  // @UseGuards(JWTAuthGuard)
  @ApiOperation({ summary: BlogPostMessage.DESCRIPTION.DRAFTS })
  @ApiQuery({
    name: "tag",
    description: BlogPostMessage.DESCRIPTION.POST_TAG,
    example: "/?tag=headline",
    required: false
  })
  @ApiQuery({
    name: "authorId",
    description: BlogPostMessage.DESCRIPTION.AUTHOR_ID,
    example: "/?authorId=66224f68a3f9a165a1ab5fbd",
    required: false
  })
  @ApiQuery({
    name: "limit",
    description: `${BlogPostMessage.DESCRIPTION.LIMIT}. ${BlogPostMessage.DESCRIPTION.DEFAULT_POSTS_LIST_LIMIT}`,
    example: "/?limit=10",
    required: false
  })
  @ApiQuery({
    name: "page",
    description: `${BlogPostMessage.DESCRIPTION.PAGE}. ${BlogPostMessage.DESCRIPTION.DEFAULT_PAGE}`,
    example: "/?page=1",
    required: false
  })
  @ApiQuery({
    name: "sortType",
    description: `${BlogPostMessage.DESCRIPTION.SORT_TYPE}. ${BlogPostMessage.DESCRIPTION.DEFAULT_SORT_TYPE}`,
    enum: SortType,
    example: "/?sortType=createdAt",
    required: false
  })
  @ApiQuery({
    name: "sortDirection",
    description: `${BlogPostMessage.DESCRIPTION.SORT_DIRECTION}. ${BlogPostMessage.DESCRIPTION.DEFAULT_SORT_DIRECTION}`,
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
  // TODO: Исправить проверку авторизации:
  // - Мы должны получать UserId из JWT Token Payload
  // и подставлять его в query.authorId
  public async getDrafts(@Query() query: GetPostsListQuery): Promise<BasePostWithPaginationRDO | null> {
    if(!query?.authorId) {
      throw new BadRequestException('Drafts can be required only by authorized users');
    }

    const searchQuery = fillDTO(GetPostsListQuery, query);

    return await this.getList(searchQuery, false);
  }

  // Поиск по заголовку (ТЗ п.8)
  @Get('search')
  @ApiOperation({ summary: BlogPostMessage.DESCRIPTION.SEARCH })
  @ApiQuery({
    name: "title",
    description: BlogPostMessage.DESCRIPTION.POST_TITLE,
    example: "/?title=headline",
    required: false
  })
  @ApiQuery({
    name: "limit",
    description: `${BlogPostMessage.DESCRIPTION.LIMIT}. ${BlogPostMessage.DESCRIPTION.DEFAULT_LIMIT}`,
    example: "/?limit=10",
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
  public async search(@Query() query: SearchPostsQuery): Promise<BasePostWithPaginationRDO | null> {
    const searchQuery = fillDTO(SearchPostsQuery, query);
    const posts = await this.index(searchQuery);

    return posts;
  }

    // Общий метод поиска (без каких-либо ограничений)
  @Get('global-search')
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
    name: "authorId",
    description: BlogPostMessage.DESCRIPTION.AUTHOR_ID,
    example: "/?authorId=66224f68a3f9a165a1ab5fbd",
    required: false
  })

  @ApiQuery({
    name: "publishedAt",
    description: BlogPostMessage.DESCRIPTION.IS_PUBLISHED,
    example: "/?isPublished=true",
    required: false
  })
  @ApiQuery({
    name: "publishedAt",
    description: BlogPostMessage.DESCRIPTION.PUBLISHED_AT,
    example: "/?publishedAt=2024-05-09",
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
    description: `${BlogPostMessage.DESCRIPTION.PAGE}. ${BlogPostMessage.DESCRIPTION.DEFAULT_PAGE}`,
    example: "/?page=1",
    required: false
  })
  @ApiQuery({
    name: "sortType",
    description: `${BlogPostMessage.DESCRIPTION.SORT_TYPE}. ${BlogPostMessage.DESCRIPTION.DEFAULT_SORT_TYPE}`,
    enum: SortType,
    example: "/?sortType=createdAt",
    required: false
  })
  @ApiQuery({
    name: "sortDirection",
    description: `${BlogPostMessage.DESCRIPTION.SORT_DIRECTION}. ${BlogPostMessage.DESCRIPTION.DEFAULT_SORT_DIRECTION}`,
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

  @Post('/:postId/repost/')
  // @UseGuards(JWTAuthGuard)
  public async repost(@Param('postId') postId: string, @Body('authorId') authorId: string): Promise<BasePostWithExtraFieldsRDO | void> {
    const createdRepost = await this.blogPostService.respost({ postId, authorId });

    return fillDTO(BasePostWithExtraFieldsRDO, createdRepost);
  }

  @Patch(':postId')
  // @UseGuards(JWTAuthGuard)
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

  @Delete(':postId')
  // @UseGuards(JWTAuthGuard)
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

  @Post('count')
  @ApiOperation({ summary: BlogPostMessage.DESCRIPTION.POSTS_COUNT })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostMessage.SUCCESS.FOUND
  })
  public async getUserPostsCount(@Body('userId') userId: string): Promise<number> {
    const userPostsCount = await this.blogPostService.getUserPostsCount(userId);

    return userPostsCount;
  }

  @Post('notify')
  @ApiOperation({ summary: BlogPostMessage.DESCRIPTION.NOTIFY })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostMessage.SUCCESS.NOTIFIED
  })
  public async notifyAboutNewPosts(): Promise<void> {
    await this.blogPostService.notifyAboutNewPosts();
  }
}
