import { ApiResponse} from '@nestjs/swagger';
import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { CreateUserDTO, LoggedUSerRDO, LoginUserDTO, UserRDO } from '@project/user/blog-user';
import { AuthenticationService } from './authentication.service';
import { AuthenticationMessage } from './authentication.constant';
import { fillDTO } from '@project/shared/helpers';
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ){}

  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.CREATED,
    description: AuthenticationMessage.SUCCESS.CREATED
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationMessage.ERROR.ALREADY_EXISTS
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDTO) {
    const newUser = await this.authService.register(dto);

    return fillDTO(UserRDO, newUser.toPOJO());
  }

  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: AuthenticationMessage.SUCCESS.LOGGED_IN
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationMessage.ERROR.INCORRECT_CREDENTIALS
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDTO) {
    const loggedUser = await this.authService.verify(dto);
    const userToken = await this.authService.createToken(loggedUser);

    const loggedUserWithPayload = {
      ...loggedUser.toPOJO(),
      ...userToken
    };

    return fillDTO(LoggedUSerRDO, loggedUserWithPayload);
  }
}
