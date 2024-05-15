import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CommentRepository } from './comment.repository';
import { CommentFactory } from './comment.factory';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { fillDTO, omitUndefined, validateMongoID } from '@project/shared/helpers';
import { CommentEntity } from './comment.entity';
import { CommentMessage } from './comment.constant';
import { CommentQuery } from './dto/comment.query';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly commentFactory: CommentFactory,
  ){}

  public async create(postId: string, dto: CreateCommentDTO) {
    // <--- TODO: Перед созданием комментария проверять
    // - Существование поста
    const commentEntity = this.commentFactory.create({ postId, ...dto });
    const comment = await this.commentRepository.create(commentEntity);

    return comment;
  }

  public async update(commentId: string, updatedFields: Partial<CommentEntity>) {
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

  public async getPaginatedComments(query: CommentQuery) {
    const postId = query?.postId;

    if(!postId) {
      throw new BadRequestException(`Can't request comments without it's post id. Passed: ${postId}`);
    }

    const searchQuery = fillDTO(CommentQuery, query);
    const comments = await this.commentRepository.getPaginatedComments(query);

    if(!comments || comments.entities.length <= 0) {
      const queryParams = Object.entries(searchQuery).join('; ').replace(/,/g, ' = ');

      throw new NotFoundException(`Can't find comments by requested params: ${queryParams}`);
    }

    return comments;
  }

  public async getCommentsByPostId(postId: string): Promise<CommentEntity[] | null> {
    const comments = await this.commentRepository.findByPostId(postId);

    if(!comments) {
      return null;
    }

    return comments;
  }


  public async getCommentsByAuthorId(authorId: string): Promise<CommentEntity[] | null> {
    const comments = await this.commentRepository.findByAuthorId(authorId);

    if(!comments) {
      return null;
    }

    return comments;
  }

  public async delete(commentId: string, userId: string): Promise<void> {
    await validateMongoID(userId);

    const isCommentExists = await this.commentRepository.findById(commentId);

    if(!isCommentExists) {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }

    if(isCommentExists.authorId !== userId) {
      throw new BadRequestException(`You can't delete comment with ID ${commentId}`);
    }

    await this.commentRepository.deleteById(commentId);
  }
}
