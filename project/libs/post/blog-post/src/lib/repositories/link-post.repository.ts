import { Injectable } from '@nestjs/common';
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

  public async create(entity: LinkPostEntity): Promise<LinkPostEntity> {
    const linkPost = await this.dbClient.linkPost.create({
      data: { ...entity }
    });

    entity.id = linkPost.id;

    return entity;
  }

  public async deleteById(id: string): Promise<void> {
    await this.dbClient.linkPost.delete({
      where: { id }
    });
  }
}
