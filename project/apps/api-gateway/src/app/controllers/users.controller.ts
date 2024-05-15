import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import { Body, Controller, Get, HttpStatus, Inject, Patch, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CheckAuthGuard } from '../guards/check-auth.guard';
import { InjectUserIdInterceptor } from '@project/interceprots'
import { apiGatewayConfig } from '@project/api-gateway-config';

import { AxiosExceptionFilter } from '../filters/axios-exception.filter';

import { ChangePasswordDTO, CreateUserDTO, LoginUserDTO, UserRDO } from '@project/user/blog-user';
import { AuthenticationMessage } from '@project/user/authentication'

type ServicesURLs = {
  auth: string,
  users: string,
  posts: string,
}

@ApiTags('Api-gateway: Users')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  public servicesURLs: ServicesURLs;

  constructor(
    private readonly httpService: HttpService,

    @Inject(apiGatewayConfig.KEY)
    private readonly config: ConfigType<typeof apiGatewayConfig>
  ) {
    this.servicesURLs = {
      auth: this.config.authenticationServiceURL,
      users: this.config.userServiceURL,
      posts: this.config.postServiceURL,
    }
  }

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
    const serviceUrl = `${this.servicesURLs.auth}/register`;

    const { data } = await this.httpService.axiosRef.post(serviceUrl, registerUserDto);

    return data;
  }

  @Post('login')
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: AuthenticationMessage.SUCCESS.LOGGED_IN
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationMessage.ERROR.INCORRECT_CREDENTIALS
  })
  public async login(@Body() loginUserDto: LoginUserDTO) {
    const serviceUrl = `${this.servicesURLs.auth}/login`;

    const { data } = await this.httpService.axiosRef.post(serviceUrl, loginUserDto);
    return data;
  }

  @Patch('password')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: AuthenticationMessage.SUCCESS.LOGGED_IN
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationMessage.ERROR.INCORRECT_CREDENTIALS
  })
  public async changePassword(@Body() dto: ChangePasswordDTO & { userId }) {
    const serviceUrl = `${this.servicesURLs.users}/${dto.userId}/password`;

    const { data } = await this.httpService.axiosRef.patch(`${serviceUrl}`, dto);

    return data;
  }

  @Post('refresh')
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
  public async refreshToken(@Req() req: Request) {
    const serviceUrl = `${this.servicesURLs.auth}/refresh`;

    const { data } = await this.httpService.axiosRef.post(serviceUrl, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @Post('detail')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
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
  public async gerUserDetail(@Body() dto: string) {
    const userServiceUrl = `${this.servicesURLs.users}/`;
    const postServiceUrl = `${this.servicesURLs.posts}/count`;

    const { data: userData } = await this.httpService.axiosRef.post(userServiceUrl, dto);

    const { data: userPostsCount } = await this.httpService.axiosRef.post(postServiceUrl, dto);

    return { ...userData, userPostsCount: userPostsCount };
  }
}
