import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common'
import { CommentService } from './comment.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { fillDTO } from '@project/shared/helpers';
import { CreateCommentRDO } from './rdo/create-comment.rdo';
import { CommentEntity } from './comment.entity';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, PartialType } from '@nestjs/swagger';
import { CommentMessage } from './comment.constant';
import { UpdateCommentDTO } from './dto/update-comment.dto';

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
      required: true,
      example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
      description: CommentMessage.DESCRIPTION.POST_ID
    })
    @ApiBody({
      required: true,
      type: CreateCommentDTO
    })
  public async create(@Param('postId') postId: string, @Body() dto: CreateCommentDTO) {
    const comment = await this.commentService.create(postId, dto);

    return fillDTO(CreateCommentRDO, comment.toPOJO());
  }


  @Get('/')
  @ApiOperation({ summary: CommentMessage.DESCRIPTION.SHOW })
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
    required: true,
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: CommentMessage.DESCRIPTION.POST_ID
  })
  public async show(@Param('postId') postId: string) {
    const documents = await this.commentService.getCommentsByPostId(postId);

    const comments = documents.map((document) => document.toPOJO())

    return fillDTO(CreateCommentRDO, comments);
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
    required: true,
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: CommentMessage.DESCRIPTION.POST_ID
  })
  @ApiParam({
    name: "commentId",
    required: true,
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: CommentMessage.DESCRIPTION.COMMENT_ID
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
    required: true,
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: CommentMessage.DESCRIPTION.POST_ID
  })
  @ApiParam({
    name: "commentId",
    required: true,
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: CommentMessage.DESCRIPTION.POST_ID
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
  async delete(@Param('commentId') commentId: string): Promise<void> {
    await this.commentService.delete(commentId);
  }
}
