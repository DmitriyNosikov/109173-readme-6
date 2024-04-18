import { Entity } from '@project/shared/core'

export interface Repository<T extends Entity> {
  findById(entityId: T['id']): Promise<T | null>;
  create(entity: T): Promise<unknown>;
  updateById(entityId: T['id'], updatedFields: Partial<T>): Promise<T>;
  deleteById(entityId: T['id']): Promise<void>;
}
