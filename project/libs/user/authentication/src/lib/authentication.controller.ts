import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDTO, LoginUserDTO, UserRDO } from '@project/blog-user';
import { fillDTO } from '@project/shared/helpers';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ){}

  @Post('register')
  public async create(@Body() dto: CreateUserDTO) {
    const newUser = await this.authService.register(dto);

    return fillDTO(UserRDO, newUser.toPOJO());
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDTO) {
    const loggedUser = await this.authService.verify(dto);

    return fillDTO(UserRDO, loggedUser.toPOJO());
  }
}
