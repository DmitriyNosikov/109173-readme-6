import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/data-access'
import { PrismaClientService } from '@project/blog/models';

import { TagEntity } from './tag.entity';
import { TagInterface } from './tag.interface';
import { TagFactory } from './tag.factory';

@Injectable()
export class TagRepository extends BasePostgresRepository<TagEntity, TagInterface> {
  constructor(
    entityFactory: TagFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }

  public async findByIdOrName(id: string = undefined, name: string = undefined): Promise<TagEntity | void> {
    const document = await this.dbClient.postTag.findFirst({
      where: {
        OR: [
          { id },
          { name }
        ]
      }
    });

    if(!document) {
      throw new NotFoundException(`Tag with ID ${id} or name ${name} not found`);
    }

    const tag = this.createEntityFromDocument(document);

    return tag;
  }

  public async findById(id: string): Promise<TagEntity> {
    const document = await this.dbClient.postTag.findFirst({
      where: { id }
    });

    return this.createEntityFromDocument(document);
  }

  public async findByName(name: string): Promise<TagEntity> {
    const document = await this.dbClient.postTag.findFirst({
      where: { name }
    });

    return this.createEntityFromDocument(document);
  }

  public async findByNames(names: string[]): Promise<TagEntity[] | void> {
    const documents = await this.dbClient.postTag.findMany({
      where: {
        name: {
          in: names
        }
      }
    });

    if(!documents) {
      return;
    }

    const tags = documents.map((document) => this.createEntityFromDocument(document));

    return tags;
  }

  public async create(entity: TagEntity): Promise<TagEntity> {
    const document = await this.dbClient.postTag.upsert({
      where: {
        name: entity.name
      },
      update: {},
      create: {
        name: entity.name
      }
      });

    entity.id = document.id;
    entity.createdAt = document.createdAt;
    entity.updatedAt = document.updatedAt;

    return entity;
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
