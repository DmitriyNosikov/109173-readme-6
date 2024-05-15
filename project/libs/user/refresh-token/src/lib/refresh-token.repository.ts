import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongoDbRepository } from '@project/shared/data-access'

import { RefreshTokenModel } from './refresh-token.model';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenFactory } from './refresh-token.factory';

@Injectable()
export class RefreshTokenRepository extends BaseMongoDbRepository<RefreshTokenEntity, RefreshTokenModel> {
  constructor(
    entityFactory: RefreshTokenFactory,
    @InjectModel(RefreshTokenModel.name) blogUserModel: Model<RefreshTokenModel>
  ){
    super(entityFactory, blogUserModel);
  }

  public async findByTokenId(tokenId: string): Promise<RefreshTokenEntity | null> {
    const token = await this.model
      .findOne({ tokenId })
      .exec();

    return this.createEntityFromDocument(token);
  }

  public async findByUserId(userId: string): Promise<RefreshTokenEntity | null> {
    const token = await this.model
      .findOne({ userId })
      .exec();

    return this.createEntityFromDocument(token);
  }

  public async deleteByTokenId(tokenId: string): Promise<void> {
    await this.model
      .deleteOne({ tokenId })
      .exec();
  }

  public async deleteExpiredTokens(): Promise<void> {
    this.model
      .deleteMany({ expiresIn: { $lt: new Date()}})
  }
}
