import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BCryptHasher } from '@project/shared/hasher';
import { omitUndefined } from '@project/shared/helpers';

import { BlogUserRepository } from './blog-user.repository';
import { BlogUserMessage } from './blog-user.constant';
import { BlogUserEntity } from './blog-user.entity';

import { UpdateUserDTO } from './dto/update-user.dto';

type BlogUserEntityWithSubscribers = {
  user: BlogUserEntity,
  subscribersCount: number;
};
@Injectable()
export class BlogUserService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,

    @Inject('Hasher')
    private readonly hasher: BCryptHasher
  ) {}

  public async getUserDetail(userId: string): Promise<BlogUserEntityWithSubscribers | null> {
    const user = await this.blogUserRepository.findById(userId);

    if(!user) {
      throw new NotFoundException(BlogUserMessage.ERROR.NOT_FOUND);
    }

    const subscribers = await this.getUserSubscribers(user.id);

    return {
      user,
      subscribersCount: subscribers.length
    };
  }

  public async updateUser(userId: string, updatedFields: UpdateUserDTO): Promise<BlogUserEntity | null> {
    const isUserExists = await this.blogUserRepository.exists(userId);

    if(!isUserExists) {
      throw new NotFoundException(BlogUserMessage.ERROR.NOT_FOUND);
    }

    updatedFields = omitUndefined(updatedFields as Record<string, unknown>);

    if(Object.keys(updatedFields).length <= 0) {
      throw new BadRequestException(BlogUserMessage.ERROR.CANT_UPDATE);
    }

    const updatedUser = await this.blogUserRepository.updateById(userId, updatedFields);

    return updatedUser;
  }

  public async changePassword(userId: string, password: string, newPassword: string): Promise<BlogUserEntity>{
    const user = await this.blogUserRepository.findById(userId);

    if(!user) {
      throw new NotFoundException(BlogUserMessage.ERROR.NOT_FOUND);
    }

    const verifyUser = await this.hasher.checkHash(password, user.passwordHash);

    if(!verifyUser) {
      throw new UnauthorizedException(BlogUserMessage.ERROR.INCORRECT_CREDENTIALS);
    }

    const newPasswordHash = await this.hasher.getHash(newPassword);
    const updatedUser =  await this.blogUserRepository.updateById(userId, { passwordHash: newPasswordHash });

    return updatedUser;
  }

  public async deleteUser(userId: string): Promise<void> {
    const isUserExists = await this.blogUserRepository.exists(userId);

    if(!isUserExists) {
      return;
    }

    return await this.blogUserRepository.deleteById(userId);
  }

  public async getUserSubscribers(userId: string): Promise<BlogUserEntity[] | null> {
    const isUserExists = await this.blogUserRepository.exists(userId);

    if(!isUserExists) {
      throw new NotFoundException(BlogUserMessage.ERROR.NOT_FOUND);
    }

    const userSubscribers = await this.blogUserRepository.getSubscribers(userId);

    return userSubscribers;
  }

  public async addSubscription(userId: string, targetUserId: string): Promise<BlogUserEntity | null> {
    await this.checkSubscribtionUsers(userId, targetUserId);

    return await this.blogUserRepository.addSubscription(userId, targetUserId);
  }

  public async removeSubscription(userId: string, targetUserId: string):Promise<BlogUserEntity | null> {
    await this.checkSubscribtionUsers(userId, targetUserId);

    return await this.blogUserRepository.removeSubscription(userId, targetUserId);
  }

  private async checkSubscribtionUsers(userId: string, targetUserId: string) {
    if(userId === targetUserId) {
      throw new BadRequestException(BlogUserMessage.ERROR.SAME_SUBSCRIPTIONS);
    }

    const isCurentUserExists = await this.blogUserRepository.exists(userId);
    const isTargetUserExists = await this.blogUserRepository.exists(targetUserId);

    if(!isCurentUserExists) {
      throw new NotFoundException(`${BlogUserMessage.ERROR.NOT_FOUND}: ${userId}`);
    }

    if(!isTargetUserExists) {
      throw new NotFoundException(`${BlogUserMessage.ERROR.NOT_FOUND}: ${targetUserId}`);
    }

    return true;
  }
}
