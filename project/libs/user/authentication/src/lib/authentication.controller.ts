import { ApiResponse} from '@nestjs/swagger';
import { Body, Controller, Post, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { CreateUserDTO, LoggedUserRDO, LoginUserDTO, UserRDO } from '@project/user/blog-user';
import { AuthenticationService } from './authentication.service';
import { AuthenticationMessage } from './authentication.constant';
import { fillDTO } from '@project/shared/helpers';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { JWTRefreshGuard } from './guards/jwt-refresh.guard';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ){}

  @Post('register')
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.CREATED,
    description: AuthenticationMessage.SUCCESS.CREATED
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationMessage.ERROR.ALREADY_EXISTS
  })
  public async create(@Body() registerUserDto: CreateUserDTO) {
    const newUser = await this.authService.register(registerUserDto);

    return fillDTO(UserRDO, newUser.toPOJO());
  }

  @Post('login')
  @UseGuards(LocalAuthGuard) // Верификация перенесена в гард через LocalStrategy
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: AuthenticationMessage.SUCCESS.LOGGED_IN
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationMessage.ERROR.INCORRECT_CREDENTIALS
  })
  // LocalAuthGuard выкидывает результат своей работы в
  // объект Request, в свойство user. Из него мы и возьмем информацию,
  // которую нам возвращает AuthenticationService.validate() через LocalAuthGuard
  public async login(@Body() dto: LoginUserDTO, @Req() { user: loggedUser }: RequestWithUser) {
    const userToken = await this.authService.createToken(loggedUser);

    const loggedUserWithPayload = {
      ...loggedUser.toPOJO(),
      ...userToken
    };

    return fillDTO(LoggedUserRDO, loggedUserWithPayload);
  }

  @Post('check')
  @UseGuards(JWTAuthGuard)
  public async checkToken(@Req() { user: tokenPayload }: RequestWithUser) {
    return tokenPayload;
  }

  @Post('refresh')
  @UseGuards(JWTRefreshGuard)
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: AuthenticationMessage.SUCCESS.NEW_TOKENS
  })
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: AuthenticationMessage.SUCCESS.CANT_CREATE_TOKENS
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    const userToken = await this.authService.createToken(user);

    const loggedUserWithPayload = {
      ...user.toPOJO(),
      ...userToken
    };

    return fillDTO(LoggedUserRDO, loggedUserWithPayload);
  }
}
