import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/data-access'
import { BlogUserEntity } from './blog-user.entity';
import { BlogUserFactory } from './blog-user.factory';

@Injectable()
export class BlogUserRepository extends BaseMemoryRepository<BlogUserEntity> {
  constructor(entityFactory: BlogUserFactory){
    super(entityFactory);
  }

  public async findByEmail(userEmail: string): Promise<BlogUserEntity | null> {
    const entities = Array.from(this.storage.values());
    const user = entities.find((user) => user.email === userEmail);

    if(!user) {
      return Promise.resolve(null);
    }

    const userEntity = this.entityFactory.create(user);

    return Promise.resolve(userEntity);
  }
}
