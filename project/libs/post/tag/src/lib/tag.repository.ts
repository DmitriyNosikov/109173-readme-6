import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';

import { TagEntity } from './tag.entity';
import { TagInterface } from '@project/shared/core';
import { TagFactory } from './tag.factory';

@Injectable()
export class TagRepository extends BasePostgresRepository<TagEntity, TagInterface> {
  constructor(
    entityFactory: TagFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }

  public async create(entity: TagEntity): Promise<TagEntity> {
    const document = await this.dbClient.postTag.create({
        data: {
          title: entity.title
        }
      });

    entity.id = document.id;

    return entity;
  }

  public async findById(id: string): Promise<TagEntity> {
    const document = await this.dbClient.postTag.findFirst({
      where: { id }
    });

    return this.createEntityFromDocument(document);
  }

  public async updateById(entityId: string, updatedFields: Partial<TagEntity>): Promise<void | TagEntity> {
    const document = await this.dbClient.postTag.update({
      where: { id: entityId },
      data: { ...updatedFields }
    });

    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.dbClient.postTag.delete({
      where: { id }
    });
  }
}
