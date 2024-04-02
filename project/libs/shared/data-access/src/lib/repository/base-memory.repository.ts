import { randomUUID } from 'node:crypto';
import { Entity, EntityFactory, StorableEntity } from '@project/shared/core';
import { Repository } from './repository.interface';
import { RepositoryMessage } from './repository.messages';

export abstract class BaseMemoryRepository<T extends Entity &
  StorableEntity<ReturnType<T['toPOJO']>>> implements Repository<T> {
  protected storage: Map<T['id'], ReturnType<T['toPOJO']>> = new Map();

  constructor(
    protected entityFactory: EntityFactory<T>
  ) {}

  public async findById(entityId: any): Promise<T | null> {
    if(!this.exists(entityId)) {
      return null;
    }

    const entity = this.storage.get(entityId);

    return this.entityFactory.create(entity);
  }

  public async create(entity: T): Promise<void> {
    if(this.exists(entity.id)) {
      return;
    }

    entity.id = randomUUID();

    this.storage.set(entity.id, entity.toPOJO());
  }

  public async updateById(entityId: T['id'], updatedFields: Partial<T>): Promise<void> {
    if(this.exists(entityId)) {
      throw new Error(RepositoryMessage.ERROR.ENTITY_NOT_FOUND);
    }

    const entity = this.findById(entityId);
    const updatedEntity = { entity, ...updatedFields };

    this.storage.set(entityId, updatedEntity.toPOJO());
  }

  public async deleteById(entityId: any): Promise<void> {
    if(!this.exists(entityId)) {
      throw new Error(RepositoryMessage.ERROR.ENTITY_NOT_FOUND);
    }

    this.storage.delete(entityId);
  }

  public async exists(entityId: string) {
    return this.storage.has(entityId);
  }
}
