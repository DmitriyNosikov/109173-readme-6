import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongoDbRepository } from '@project/shared/data-access'
import { BlogUserEntity } from './blog-user.entity';
import { BlogUserFactory } from './blog-user.factory';
import { BlogUserModel } from './blog-user.model';

@Injectable()
export class BlogUserRepository extends BaseMongoDbRepository<BlogUserEntity, BlogUserModel> {
  constructor(
    entityFactory: BlogUserFactory,
    @InjectModel(BlogUserModel.name) blogUserModel: Model<BlogUserModel>
  ){
    super(entityFactory, blogUserModel);
  }

  public async findByEmail(userEmail: string): Promise<BlogUserEntity | null> {
    const user = await this.model.findOne({ email: userEmail }).exec();

    if(!user) {
      return Promise.resolve(null);
    }

    const userEntity = this.createEntityFromDocument(user);

    return Promise.resolve(userEntity);
  }
}
