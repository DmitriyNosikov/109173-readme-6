import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';

import { LikeEntity } from './like.entity';
import { LikeInterface } from './like.interface';
import { LikeFactory } from './like.factory';

@Injectable()
export class LikeRepository extends BasePostgresRepository<LikeEntity, LikeInterface> {
  constructor(
    entityFactory: LikeFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }

  public async create(entity: LikeEntity): Promise<LikeEntity> {
    const document = await this.dbClient.postLike.create({
      data: {
        postId: entity.postId,
        authorId: entity.authorId,
       }
    });

    entity.id = document.id;

    return entity;
  }

  public async findById(id: string): Promise<LikeEntity> {
    const document = await this.dbClient.postLike.findFirst({
      where: { id }
    });

    return this.createEntityFromDocument(document);
  }

  public async findByPostId(postId: string): Promise<LikeEntity[] | null> {
    const documents = await this.dbClient.postLike.findMany({
      where: { postId }
    });

    if(!documents) {
      return null;
    }

    const likes = documents.map((document) => this.createEntityFromDocument(document));

    return likes;
  }

  public async findByAuthorId(authorId: string): Promise<LikeEntity[] | null> {
    const documents = await this.dbClient.postLike.findMany({
      where: { authorId }
    });

    if(!documents) {
      return null;
    }

    const likes = documents.map((document) => this.createEntityFromDocument(document));

    return likes;
  }

  public async updateById(
    entityId: string,
    updatedFields: Partial<LikeEntity>
  ): Promise<void | LikeEntity> {
    const document = await this.dbClient.postLike.update({
      where: { id: entityId },
      data: { ...updatedFields }
    });

    return this.createEntityFromDocument(document);
  }

  public async toggleLike(entity: LikeEntity): Promise<LikeEntity | void> {
    const document = await this.dbClient.postLike.findFirst({
      where: {
        postId: entity.postId,
        authorId: entity.authorId
      }
    });

    if(!document) {
      const like = await this.create(entity);

      return like;
    }

    await this.deleteById(document.id);
  }

  public async deleteById(id: string): Promise<void> {
    await this.dbClient.postLike.delete({
      where: { id }
    });
  }
}
