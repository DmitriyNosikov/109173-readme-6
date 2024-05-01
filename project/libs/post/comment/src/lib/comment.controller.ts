import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { CommentService } from './comment.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { fillDTO } from '@project/shared/helpers';
import { CreateCommentRDO } from './rdo/create-comment.rdo';
import { CommentEntity } from './comment.entity';


@Controller('posts/:postId/comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ){}

  @Post('/')
  public async create(@Param('postId') postId: string, @Body() dto: CreateCommentDTO) {
    const comment = await this.commentService.create(postId, dto);

    return fillDTO(CreateCommentRDO, comment.toPOJO());
  }


  @Get('/')
  public async show(@Param('postId') postId: string) {
    const documents = await this.commentService.getCommentsByPostId(postId);

    const comments = documents.map((document) => document.toPOJO())

    return fillDTO(CreateCommentRDO, comments);
  }

  @Patch(':commentId')
  async update(@Param('commentId') commentId: string, @Body() updatedFields: Partial<CommentEntity>): Promise<CreateCommentRDO> {
    const updatedComment = await this.commentService.update(commentId, updatedFields);

    if(!updatedComment) {
      return;
    }

    return fillDTO(CreateCommentRDO, updatedComment.toPOJO());
  }

  @Delete(':commentId')
  async delete(@Param('commentId') commentId: string): Promise<void> {
    await this.commentService.delete(commentId);
  }
}
