import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ChangePasswordDTO, CreateUserDTO, LoginUserDTO, UserRDO } from '@project/blog-user';
import { fillDTO } from '@project/shared/helpers';
import { BlogUserEntity } from 'libs/user/blog-user/src/lib/blog-user.entity';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ){}

  @Post('register')
  public async create(@Body() dto: CreateUserDTO) {
    const newUser = await this.authService.register(dto);

    return newUser.toPOJO();
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDTO) {
    const loggedUser = await this.authService.verify(dto);

    return loggedUser.toPOJO();
  }

  @Get(':userId')
  public async show(@Param('userId') userId: string) {
    const user = await this.authService.getUser(userId);

    return user.toPOJO();
  }

  @Patch('password/:userId')
  public async changePassword(
    @Param('userId') userId: string,
    @Body() dto: ChangePasswordDTO
  ): Promise<BlogUserEntity> {
    const { password, newPassword } = dto;
    const updatedUser = await this.authService.changePassword(userId, password, newPassword);

    return updatedUser;
  }
}
