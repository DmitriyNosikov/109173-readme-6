import { randomUUID } from 'node:crypto';
import { Entity, EntityFactory, StorableEntity } from '@project/shared/core';
import { Repository } from './repository.interface';
import { RepositoryMessage } from './repository.constant';

export abstract class BaseMemoryRepository<T extends Entity &
  StorableEntity<ReturnType<T['toPOJO']>>> implements Repository<T> {
  protected storage: Map<T['id'], ReturnType<T['toPOJO']>> = new Map();

  constructor(
    protected entityFactory: EntityFactory<T>
  ) {}

  public async findById(entityId: T['id']): Promise<T | null> {
    const entity = this.storage.get(entityId);

    if(!entity) {
      return null;
    }

    return Promise.resolve(this.entityFactory.create(entity));
  }

  public async create(entity: T): Promise<ReturnType<T['toPOJO']>> {
    entity.id = randomUUID();
    const entityPlainObject = entity.toPOJO();

    await this.storage.set(entity.id, entityPlainObject);

    return Promise.resolve(entityPlainObject);
  }

  public async updateById(entityId: T['id'], updatedFields: Partial<T>): Promise<T> {
    const entity = await this.findById(entityId);
    const entityPlainObject = entity.toPOJO();
    const updatedEntity = { ...entityPlainObject, ...updatedFields } as ReturnType<T['toPOJO']>;

    console.log('ENTITY: ', entityPlainObject);
    console.log('FIELDS: ', updatedFields);
    console.log('UPDATED ENTITY: ', updatedEntity);

    await this.storage.set(entityId, updatedEntity);

    return Promise.resolve(this.entityFactory.create(updatedEntity));
  }

  public async deleteById(entityId: T['id']): Promise<void> {
    if(!this.exists(entityId)) {
      throw new Error(RepositoryMessage.ERROR.ENTITY_NOT_FOUND);
    }

    await this.storage.delete(entityId);

    return Promise.resolve();
  }

  public async exists(entityId: string): Promise<boolean> {
    return Promise.resolve(this.storage.has(entityId));
  }
}
