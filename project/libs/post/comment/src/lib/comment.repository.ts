import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';

import { CommentEntity } from './comment.entity';
import { CommentInterface } from './comment.interface';
import { CommentFactory } from './comment.factory';

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
