import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';

import { CommentEntity } from './comment.entity';
import { CommentInterface } from './comment.interface';
import { CommentFactory } from './comment.factory';
import { PaginationResult } from '@project/shared/core';
import { CommentQuery } from './dto/comment.query';
import { CommentValidation } from './comment.constant';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentRepository extends BasePostgresRepository<CommentEntity, CommentInterface> {
  constructor(
    entityFactory: CommentFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }

  public async create(entity: CommentEntity): Promise<CommentEntity> {
    const document = await this.dbClient.postComment.create({
        data: {
          postId: entity.postId,
          authorId: entity.authorId,
          text: entity.text
        }
      });

    entity.id = document.id;
    entity.createdAt = document.createdAt;
    entity.updatedAt = document.updatedAt;

    return entity;
  }

  public async findById(id: string): Promise<CommentEntity> {
    const document = await this.dbClient.postComment.findFirst({
      where: { id }
    });

    return this.createEntityFromDocument(document);
  }

  // Попробовать оптимизировать поиск по посту и автору в один метод
  public async findByPostId(postId: string): Promise<CommentEntity[] | null> {
    const documents = await this.dbClient.postComment.findMany({
      where: { postId }
    });

    if(!documents) {
      return null;
    }

    const comments = documents.map((document) => this.createEntityFromDocument(document));

    return comments;
  }

  public async findByAuthorId(authorId: string): Promise<CommentEntity[] | null> {
    const documents = await this.dbClient.postComment.findMany({
      where: { authorId }
    });

    if(!documents) {
      return null;
    }

    const comments = documents.map((document) => this.createEntityFromDocument(document));

    return comments;
  }

  public async getPaginatedComments(query: CommentQuery): Promise<PaginationResult<CommentEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = (!query?.limit || query?.limit > CommentValidation.MAX_COMMENTS_PER_PAGE)
      ? CommentValidation.MAX_COMMENTS_PER_PAGE
      : query.limit;
    const where: Prisma.PostCommentWhereInput = { postId: query.postId };

    const [comments, commentsCount] = await Promise.all([
      this.dbClient.postComment.findMany({
        where,

        // Pagination
        take,
        skip,
        orderBy: [
          { createdAt: 'desc' }
        ]
      }),
      this.dbClient.postComment.count({ where })
    ]);

    const commentsEntities = comments.map((comment) => this.createEntityFromDocument(comment));

    return {
      entities: commentsEntities,
      currentPage:  query?.page ?? 0,
      totalPages: Math.ceil(commentsCount / take),
      totalItems: commentsCount,
      itemsPerPage: take ?? commentsCount,
    }
  }

  public async updateById(entityId: string, updatedFields: Partial<CommentEntity>): Promise<void | CommentEntity> {
    const document = await this.dbClient.postComment.update({
      where: { id: entityId },
      data: { ...updatedFields }
    });

    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.dbClient.postComment.delete({
      where: { id }
    });
  }
}
