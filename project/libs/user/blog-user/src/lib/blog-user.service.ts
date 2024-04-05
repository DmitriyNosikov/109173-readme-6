import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BlogUserRepository } from './blog-user.repository';
import { BlogUserMessage } from './blog-user.constant';
import { BlogUserEntity } from './blog-user.entity';
import { BCryptHasher } from '@project/shared/hasher';
import { omitUndefined } from '@project/shared/helpers';

@Injectable()
export class BlogUserService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,

    @Inject('Hasher')
    private readonly hasher: BCryptHasher
  ) {}

  public async getUser(userId: string): Promise<BlogUserEntity | null> {
    const user = await this.blogUserRepository.findById(userId);

    if(!user) {
      throw new NotFoundException(BlogUserMessage.ERROR.NOT_FOUND);
    }

    return user;
  }

  public async updateUser(userId: string, updatedFields: Partial<BlogUserEntity>): Promise<BlogUserEntity | null> {
    const isUserExists = await this.blogUserRepository.exists(userId);

    if(!isUserExists) {
      throw new NotFoundException(BlogUserMessage.ERROR.NOT_FOUND);
    }

    updatedFields = omitUndefined(updatedFields);

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
}
