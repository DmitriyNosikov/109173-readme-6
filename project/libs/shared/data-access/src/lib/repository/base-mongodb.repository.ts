import { Entity, EntityFactory, StorableEntity } from '@project/shared/core';
import { Document, InferId, Model  } from 'mongoose';
import { Repository } from './repository.interface';
import { NotFoundException } from '@nestjs/common';
import { RepositoryMessage } from './repository.constant';

export class BaseMongoDbRepository<
  T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>,
  DocumentType extends Document
> implements Repository<T> {
  constructor(
    protected readonly entityFactory: EntityFactory<T>,
    protected readonly model: Model<DocumentType>
  ) {}

  protected createEntityFromDocument(document: DocumentType): T | null {
    if(!document) {
      return null;
    }

    const plainObject = document.toObject({ versionKey: false });

    plainObject.id = plainObject._id.toString();

    return this.entityFactory.create(plainObject);
  }

  async findById(entityId: T['id']): Promise<T> {
    const document = await this.model
      .findById(entityId)
      .exec();

    return this.createEntityFromDocument(document);
  }

  async create(entity: T): Promise<T> {
    const entityPlainObject = entity.toPOJO();
    const document = await this.model.create(entityPlainObject);

    entity.id = document.id;

    return this.createEntityFromDocument(document);
  }

  async updateById(entityId: T['id'], updatedFields: Partial<T>): Promise<T> {
    const updatedDocument = await this.model
      .findByIdAndUpdate(
        entityId,
        updatedFields.toPOJO(),
        { new: true, runValidators: true }
      )
      .exec();

      if(!updatedDocument) {
        throw new NotFoundException(RepositoryMessage.ERROR.ENTITY_NOT_FOUND)
      }

      return this.createEntityFromDocument(updatedDocument);
  }

  async deleteById(entityId: T['id']): Promise<void> {
    const deletedDocument = await this.model
      .findByIdAndDelete(entityId)
      .exec();

    if(!deletedDocument) {
      throw new NotFoundException(RepositoryMessage.ERROR.ENTITY_NOT_FOUND);
    }
  }

  async exists(entityId:  InferId<DocumentType>): Promise<boolean> {
    const document = await this.model.exists({ _id: entityId });

    return (document !== null);
  }
}
