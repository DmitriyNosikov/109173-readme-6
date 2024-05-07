import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';

import { TextPostInterface } from '@project/shared/core';
import { TextPostEntity } from '../entities/text-post.entity';
import { TextPostFactory } from '../factories/text-post.factory';

@Injectable()
export class TextPostRepository extends BasePostgresRepository<TextPostEntity, TextPostInterface> {
  constructor(
    entityFactory: TextPostFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }

  public async findById(id: string): Promise<TextPostEntity | null> {
    return await this.exists(id);
  }

  public async findByIds(ids: string[]): Promise<TextPostEntity[] | null> {
    const documents = await this.dbClient.textPost.findMany({
      where: {
        id: {
          in: ids
        }
      }
    });

    const textPosts = documents.map((document) => this.createEntityFromDocument(document))

    return textPosts;
  }

  public async create(entity: TextPostEntity): Promise<TextPostEntity> {
    const textPost = await this.dbClient.textPost.create({
      data: { ...entity }
    });

    entity.id = textPost.id;

    return entity;
  }

  public async updateById(
    id: string,
    updatedFields: Partial<TextPostEntity>
  ): Promise<TextPostEntity | void> {

    await this.exists(id);

    const document = await this.dbClient.textPost.update({
      where: { id },
      data: { ...updatedFields }
    });

    const textPost = this.createEntityFromDocument(document);

    return textPost;
  }

  public async deleteById(id: string): Promise<void> {
    await this.dbClient.textPost.delete({
      where: { id }
    });
  }

  public async exists(id: string): Promise<TextPostEntity | null> {
    const document = await this.dbClient.textPost.findFirst({
      where: { id }
    });

    if(!document) {
      throw new NotFoundException(`Can't find Text Post with id ${id}`);
    }

    const textPost = this.createEntityFromDocument(document);

    return textPost;
  }
}
