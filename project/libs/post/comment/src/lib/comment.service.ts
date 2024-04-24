import { BadRequestException, Injectable } from '@nestjs/common'
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
    // - Авторизацию пользователя
    // - Существование поста
    const commentEntity = this.commentFactory.create({ postId, ...dto });
    const comment = await this.commentRepository.create(commentEntity);

    return comment;
  }

  async update(commentId: string, updatedFields: Partial<CommentEntity>) {
    // <--- TODO: Перед обновлением комментария проверятьЖ
    // - Существование комментария
    updatedFields = omitUndefined(updatedFields);

    if(Object.keys(updatedFields).length <= 0) {
      throw new BadRequestException(CommentMessage.ERROR.CANT_UPDATE);
    }

    const updatedComment = await this.commentRepository.updateById(commentId, updatedFields);

    return updatedComment;
  }

  async delete(commentId: string): Promise<void> {
    // <--- TODO: Перед обновлением комментария проверятьЖ
    // - Существование комментария

    await this.commentRepository.deleteById(commentId);
  }
}
