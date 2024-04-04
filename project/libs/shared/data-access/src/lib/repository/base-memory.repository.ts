import { randomUUID } from 'node:crypto';
import { Entity, EntityFactory, StorableEntity } from '@project/shared/core';
import { Repository } from './repository.interface';
import { RepositoryMessage } from './repository.contant';

export abstract class BaseMemoryRepository<T extends Entity &
  StorableEntity<ReturnType<T['toPOJO']>>> implements Repository<T> {
  protected storage: Map<T['id'], ReturnType<T['toPOJO']>> = new Map();

  constructor(
    protected entityFactory: EntityFactory<T>
  ) {
    console.log('Base memory repo constructed!');
  }

  public async findById(entityId: any): Promise<T | null> {
    if(!this.exists(entityId)) {
      return null;
    }

    const entity = this.storage.get(entityId);

    return Promise.resolve(this.entityFactory.create(entity));
  }

  public async create(entity: T): Promise<ReturnType<T['toPOJO']>> {
    console.log('Trying to create a new user');
    if(entity.id && this.exists(entity.id)) {
      return;
    }

    entity.id = randomUUID();
    const entityPlainObject = entity.toPOJO();

    await this.storage.set(entity.id, entityPlainObject);

    return Promise.resolve(entityPlainObject);
  }

  public async updateById(entityId: T['id'], updatedFields: Partial<T>): Promise<T> {
    if(this.exists(entityId)) {
      throw new Error(RepositoryMessage.ERROR.ENTITY_NOT_FOUND);
    }

    const entity = await this.findById(entityId);
    const entityPlainObject = entity.toPOJO();
    const updatedEntity: ReturnType<T['toPOJO']> = { entityPlainObject, ...updatedFields.toPOJO() };

    await this.storage.set(entityId, updatedEntity);

    return Promise.resolve(this.entityFactory.create(updatedEntity));
  }

  public async deleteById(entityId: any): Promise<void> {
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
