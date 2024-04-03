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

    const hashedPassword = await this.hasher.getHash(password);
    const blogUser = {
      email,
      name,
      avatar,
      passwordHash: hashedPassword,
      date: getdate()
    };

    const userEntity = this.blogUserFactory.create(blogUser);

    await this.blogUserRepository.create(userEntity);

    return userEntity;
  }

  public async verify(dto: LoginUserDTO): Promise<BlogUserEntity> {
    const { email, password } = dto;
    const user = await this.blogUserRepository.findByEmail(email);

    if(!user) {
      throw new NotFoundException(AuthenticationMessage.ERROR.NOT_FOUND);
    }

    const verifyUser = await this.hasher.checkHash(password, user.passwordHash);

    if(!verifyUser) {
      throw new UnauthorizedException(AuthenticationMessage.ERROR.INCORRECT_CREDENTIALS);
    }

    return user;
  }
}
