import { Entity, EntityFactory, StorableEntity } from '@project/shared/core';
import { Model  } from 'mongoose';
import { Repository } from './repository.interface';
import { NotImplementedException } from '@nestjs/common';

export class BaseMongoDbRepository<T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>> implements Repository<T> {
  constructor(
    protected readonly entityFactory: EntityFactory<T>,
    protected readonly model: Model<DocumentType>
  ) {}

  protected createEntityFromDocument(document: unknown): T | null  {
    return this.entityFactory.create(document as ReturnType<T['toPOJO']>);
  }

  async findById(entityId: T['id']): Promise<T> {
    throw new NotImplementedException();
  }

  async create(entity: T): Promise<T> {
    throw new NotImplementedException();
  }

  async updateById(entityId: T['id'], updatedFields: Partial<T>): Promise<T> {
    throw new NotImplementedException();
  }

  async deleteById(entityId: T['id']): Promise<void> {
    throw new NotImplementedException();
  }
}
