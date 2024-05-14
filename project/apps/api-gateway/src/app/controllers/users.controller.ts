import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import { Body, Controller, HttpStatus, Inject, Post, Req, UseFilters } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { apiGatewayConfig } from '@project/api-gateway-config';

import { AxiosExceptionFilter } from '../filters/axios-exception.filter';

import { CreateUserDTO, LoginUserDTO, UserRDO } from '@project/user/blog-user';
import { AuthenticationMessage } from '@project/user/authentication'


@ApiTags('Api-gateway: Users')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService,

    @Inject(apiGatewayConfig.KEY)
    private readonly config: ConfigType<typeof apiGatewayConfig>
  ) {}

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
    const serviceUrl = `${this.config.authenticationServiceURL}/register`;

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
    const serviceUrl = `${this.config.authenticationServiceURL}/login`;

    const { data } = await this.httpService.axiosRef.post(serviceUrl, loginUserDto);
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
    const serviceUrl = `${this.config.authenticationServiceURL}/refresh`;

    console.log('Тут: ', serviceUrl);

    const { data } = await this.httpService.axiosRef.post(serviceUrl, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }
}
