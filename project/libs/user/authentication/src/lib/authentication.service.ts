import { ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { BlogUserEntity, BlogUserFactory, BlogUserRepository, CreateUserDTO, LoginUserDTO } from '@project/user/blog-user';

import { AuthenticationMessage } from './authentication.constant';

import { HasherInterface } from '@project/shared/hasher';
import { UserInterface, TokenPayload } from '@project/shared/core';
import { JwtService } from '@nestjs/jwt';
import { UserNotifyService } from '@project/user/user-notify';
@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly blogUserFactory: BlogUserFactory,

    @Inject('Hasher')
    private readonly hasher: HasherInterface,

    private readonly jwtService: JwtService,

    private readonly notifyService: UserNotifyService
  ){}

  public async register(dto: CreateUserDTO): Promise<BlogUserEntity> {
    const { email, firstName, lastName, avatar, password } = dto;
    const user = await this.blogUserRepository.findByEmail(email);

    if(user) { // Если пользователь уже есть в системе - не регистрируем
      throw new ConflictException(AuthenticationMessage.ERROR.ALREADY_EXISTS);
    }

    const blogUser = {
      email,
      firstName,
      lastName,
      avatar,
      passwordHash: ''
    };

    const userEntity = this.blogUserFactory.create(blogUser);
    const hashedPassword = await this.hasher.getHash(password);

    userEntity.setPassword(hashedPassword);

    await this.blogUserRepository.create(userEntity);

    // Через данный метод мы отправляем в RabbitMQ уведомление о том, что у нас
    // зарегистрирован новый пользователь, далее, после появления в очереди
    // RabbitMQ данного сообщения, в контроллере модуля EmailSubscriber срабатывает
    // соответствующий роут на Create, что в свою очередь добавляет пользователя,
    //  в базу подписчиков для дальнейшей возможности отправки ему уведомлений по email
    const registeredSubscriber = await this.notifyService.registerSubscriber({ email, firstName, lastName });

    if(registeredSubscriber) {
      console.log(`Subscriber ${email} successfully registered`);
    }

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

  public async createToken(user: UserInterface) {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName
    }


    try {
      const accessToken = await this.jwtService.signAsync(payload);

      return { accessToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);

      throw new HttpException('Can`t create JWT-Token.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
