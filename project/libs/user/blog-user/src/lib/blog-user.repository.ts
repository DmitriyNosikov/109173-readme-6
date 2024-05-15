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

  public async addSubscription(currentUserId: string, targetUserId: string) {
    const currentUser = await this.findById(currentUserId);
    const userSubscribtions = currentUser.subscriptions ?? [];

    if(userSubscribtions.includes(targetUserId)) {
      return currentUser;
    }

    userSubscribtions.push(targetUserId);

    const updatedUser = await this.model
      .findByIdAndUpdate(
          currentUserId,
          { subscriptions: userSubscribtions },
          { new: true }
      );

    const userEntity = this.createEntityFromDocument(updatedUser);

    return userEntity;
  }

  public async removeSubscription(currentUserId: string, targetUserId: string) {
    const currentUser = await this.findById(currentUserId);
    const userSubscribtions = currentUser.subscriptions ?? [];

    if(!userSubscribtions.includes(targetUserId)) {
      return currentUser;
    }

    const updatedSubscriptions = userSubscribtions.filter((subscribeId) => subscribeId !== targetUserId);
    const updatedUser = await this.model
      .findByIdAndUpdate(
          currentUserId,
          { subscriptions: updatedSubscriptions },
          { new: true }
      );

    const userEntity = this.createEntityFromDocument(updatedUser);

    return userEntity;
  }

  public async getSubscribers(userId: string): Promise<BlogUserEntity[] | null> {
    const subscribers = await this.model.find({ subscriptions: userId });
    const userSubscribers = subscribers.map((subscriber) => this.createEntityFromDocument(subscriber));

    return userSubscribers;
  }
}
