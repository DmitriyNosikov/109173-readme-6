import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CommentRepository } from './comment.repository';
import { CommentFactory } from './comment.factory';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { BlogPostService } from '@project/blog-post';
import { omitUndefined } from '@project/shared/helpers';
import { CommentEntity } from './comment.entity';
import { CommentMessage } from './comment.constant';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly commentFactory: CommentFactory,
    private readonly blogPostService: BlogPostService
  ){}

  async create(postId: string, dto: CreateCommentDTO) {
    // <--- TODO: Перед созданием комментария проверятьЖ
    // - Существование поста
    const commentEntity = this.commentFactory.create({ postId, ...dto });
    const comment = await this.commentRepository.create(commentEntity);

    return comment;
  }

  async update(commentId: string, updatedFields: Partial<CommentEntity>) {
    const isCommentExists = await this.commentRepository.findById(commentId);

    if(!isCommentExists) {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }

    updatedFields = omitUndefined(updatedFields);

    if(Object.keys(updatedFields).length <= 0) {
      throw new BadRequestException(CommentMessage.ERROR.CANT_UPDATE);
    }

    const updatedComment = await this.commentRepository.updateById(commentId, updatedFields);

    return updatedComment;
  }

  async getCommentsByPostId(postId: string): Promise<CommentEntity[] | null> {
    const comments = await this.commentRepository.findByPostId(postId);

    if(!comments) {
      return null;
    }

    return comments;
  }


  async getCommentsByAuthorId(authorId: string): Promise<CommentEntity[] | null> {
    const comments = await this.commentRepository.findByAuthorId(authorId);

    if(!comments) {
      return null;
    }

    return comments;
  }

  async delete(commentId: string): Promise<void> {
    const isCommentExists = await this.commentRepository.findById(commentId);

    if(!isCommentExists) {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }

    await this.commentRepository.deleteById(commentId);
  }
}
