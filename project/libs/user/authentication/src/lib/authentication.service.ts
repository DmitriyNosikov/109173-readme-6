import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { BlogUserFactory, BlogUserRepository, CreateUserDTO } from '@project/blog-user';
import { HasherInterface } from '@project/shared/hasher';
import { getdate } from '@project/shared/helpers'
import { AuthenticationMessage } from './authentication.constant';
import { BlogUserEntity } from 'libs/user/blog-user/src/lib/blog-user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly blogUserFactory: BlogUserFactory

    @Inject('Hasher')
    private readonly hasher: HasherInterface
  ){}

  public async register(dto: CreateUserDTO): Promise<BlogUserEntity> {
    const { email, name, avatar, password } = dto;

    if(this.blogUserRepository.findByEmail(email)) {
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

    return await this.blogUserRepository.create(userEntity);
  }
}
