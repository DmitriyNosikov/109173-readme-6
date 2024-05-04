import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';

import { LinkPostInterface } from '@project/shared/core';
import { LinkPostEntity } from '../entities/link-post.entity';
import { LinkPostFactory } from '../factories/link-post.factory';

@Injectable()
export class LinkPostRepository extends BasePostgresRepository<LinkPostEntity, LinkPostInterface> {
  constructor(
    entityFactory: LinkPostFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }

  public async findById(id: string): Promise<LinkPostEntity | null> {
    return await this.exists(id);
  }

  public async findByIds(ids: string[]): Promise<LinkPostEntity[] | null> {
    const documents = await this.dbClient.linkPost.findMany({
      where: {
        id: {
          in: ids
        }
      }
    });

    const linkPosts = documents.map((document) => this.createEntityFromDocument(document))

    return linkPosts;
  }

  public async create(entity: LinkPostEntity): Promise<LinkPostEntity> {
    const linkPost = await this.dbClient.linkPost.create({
      data: { ...entity }
    });

    entity.id = linkPost.id;

    return entity;
  }

  public async updateById(
    id: string,
    updatedFields: Partial<LinkPostEntity>
  ): Promise<LinkPostEntity | void> {

    await this.exists(id);

    const document = await this.dbClient.linkPost.update({
      where: { id },
      data: { ...updatedFields }
    });

    const linkPost = this.createEntityFromDocument(document);

    return linkPost;
  }

  public async deleteById(id: string): Promise<void> {
    await this.dbClient.linkPost.delete({
      where: { id }
    });
  }

  public async exists(id: string): Promise<LinkPostEntity | null> {
    const document = await this.dbClient.linkPost.findFirst({
      where: { id }
    });

    if(!document) {
      throw new NotFoundException(`Can't find Link Post with id ${id}`);
    }

    const linkPost = this.createEntityFromDocument(document);

    return linkPost;
  }
}
