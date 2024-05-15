import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common'
import { CommentService } from './comment.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { fillDTO } from '@project/shared/helpers';
import { CreateCommentRDO } from './rdo/create-comment.rdo';
import { CommentEntity } from './comment.entity';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, PartialType } from '@nestjs/swagger';
import { CommentMessage } from './comment.constant';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import { CommentQuery } from './dto/comment.query';
import { CommentsWithPaginationRDO } from './types/comments-with-pagination';

@ApiTags('comments')
@Controller('posts/:postId/comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ){}

  @Post('/')
  // @UseGuards(JWTAuthGuard)
  @ApiOperation({ summary: CommentMessage.DESCRIPTION.CREATE })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CommentMessage.SUCCESS.CREATED,
    type: CreateCommentRDO
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: CommentMessage.ERROR.UNAUTHORIZED
  })
  @ApiParam({
    name: "postId",
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: CommentMessage.DESCRIPTION.POST_ID,
    required: true
  })
  @ApiBody({
    type: CreateCommentDTO,
    required: true
  })
  public async create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDTO
  ) {
    const comment = await this.commentService.create(postId, dto);

    return fillDTO(CreateCommentRDO, comment.toPOJO());
  }

  @Get('/')
  @ApiOperation({ summary: CommentMessage.DESCRIPTION.INDEX })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CommentMessage.SUCCESS.FOUND,
    type: CreateCommentRDO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentMessage.ERROR.NOT_FOUND
  })
  @ApiParam({
    name: "postId",
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: CommentMessage.DESCRIPTION.POST_ID,
    required: true
  })
  @ApiQuery({
    name: "limit",
    description: `${CommentMessage.DESCRIPTION.LIMIT}. ${CommentMessage.DESCRIPTION.DEFAULT_LIMIT}`,
    example: "/?limit=10",
    required: false
  })
  @ApiQuery({
    name: "page",
    description: `${CommentMessage.DESCRIPTION.PAGE}. ${CommentMessage.DESCRIPTION.DEFAULT_PAGE}`,
    example: "/?page=1",
    required: false
  })
  public async index(
    @Param('postId') postId: string,
    @Query() query: CommentQuery
  ) {
    const paginatedComments = await this.commentService.getPaginatedComments({ ...query, postId });

    return fillDTO(CommentsWithPaginationRDO, paginatedComments);
  }

  @Patch(':commentId')
  @ApiOperation({ summary: CommentMessage.DESCRIPTION.UPDATE })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CommentMessage.SUCCESS.UPDATED,
    type: CreateCommentRDO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentMessage.ERROR.NOT_FOUND
  })
  @ApiParam({
    name: "postId",
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: CommentMessage.DESCRIPTION.POST_ID,
    required: true
  })
  @ApiParam({
    name: "commentId",
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: CommentMessage.DESCRIPTION.COMMENT_ID,
    required: true
  })
  @ApiBody({
    type: PartialType(UpdateCommentDTO)
  })
  async update(@Param('commentId') commentId: string, @Body() updatedFields: Partial<CommentEntity>): Promise<CreateCommentRDO> {
    const updatedComment = await this.commentService.update(commentId, updatedFields);

    if(!updatedComment) {
      return;
    }

    return fillDTO(CreateCommentRDO, updatedComment.toPOJO());
  }

  @Delete(':commentId')
  @ApiOperation({ summary: CommentMessage.DESCRIPTION.DELETE })
  @ApiParam({
    name: "postId",
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: CommentMessage.DESCRIPTION.POST_ID,
    required: true
  })
  @ApiParam({
    name: "commentId",
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: CommentMessage.DESCRIPTION.POST_ID,
    required: true
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: CommentMessage.SUCCESS.DELETED
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentMessage.ERROR.NOT_FOUND
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('commentId') commentId: string,
    @Body('userId') userId: string,
  ): Promise<void> {
    await this.commentService.delete(commentId, userId);
  }
}
