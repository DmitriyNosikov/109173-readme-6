import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { BlogUserFactory, BlogUserRepository, CreateUserDTO, LoginUserDTO } from '@project/blog-user';
import { HasherInterface } from '@project/shared/hasher';
import { getdate } from '@project/shared/helpers'
import { AuthenticationMessage } from './authentication.constant';
import { BlogUserEntity } from 'libs/user/blog-user/src/lib/blog-user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly blogUserFactory: BlogUserFactory,

    @Inject('Hasher')
    private readonly hasher: HasherInterface
  ){}

  public async register(dto: CreateUserDTO): Promise<BlogUserEntity> {
    const { email, name, avatar, password } = dto;
    const user = await this.blogUserRepository.findByEmail(email);

    if(user) { // Если пользователь уже есть в системе - не регистрируем
      throw new ConflictException(AuthenticationMessage.ERROR.ALREADY_EXISTS);
    }

    const blogUser = {
      email,
      name,
      avatar,
      passwordHash: '',
      date: getdate()
    };

    const userEntity = this.blogUserFactory.create(blogUser);
    const hashedPassword = await this.hasher.getHash(password);

    userEntity.setPassword(hashedPassword);

    await this.blogUserRepository.create(userEntity);

    return userEntity;
  }

  public async verify(dto: LoginUserDTO): Promise<BlogUserEntity> {
    const { email, password } = dto;
    const user = await this.blogUserRepository.findByEmail(email);

    if(!user) {
      throw new NotFoundException(AuthenticationMessage.ERROR.NOT_FOUND);
    }


    await this.checkUserPassword(password, user.passwordHash)

    return user;
  }

  public async getUser(userId: string): Promise<BlogUserEntity | null> {
    const user = await this.blogUserRepository.findById(userId);

    if(!user) {
      throw new NotFoundException(AuthenticationMessage.ERROR.NOT_FOUND);
    }

    return user;
  }

  public async updateUser(userId: string, updatedFields: Partial<BlogUserEntity>): Promise<BlogUserEntity> {
    const isUserExists = this.blogUserRepository.exists(userId);

    if(!isUserExists) {
      throw new NotFoundException(AuthenticationMessage.ERROR.NOT_FOUND);
    }

    const updatedUser = await this.blogUserRepository.updateById(userId, updatedFields);

    return updatedUser;
  }

  public async changePassword(userId: string, password: string, newPassword: string): Promise<BlogUserEntity>{
    const user = await this.blogUserRepository.findById(userId);

    if(!user) {
      throw new NotFoundException(AuthenticationMessage.ERROR.NOT_FOUND);
    }

    await this.checkUserPassword(password, user.passwordHash)

    const newPasswordHash = await this.hasher.getHash(newPassword);

    return await this.updateUser(userId, { passwordHash: newPasswordHash });
  }

  private async checkUserPassword(password: string, passwordHash: string): Promise<boolean> {
    const verifyUser = await this.hasher.checkHash(password, passwordHash);

    if(!verifyUser) {
      throw new UnauthorizedException(AuthenticationMessage.ERROR.INCORRECT_CREDENTIALS);
    }

    return true;
  }
}
