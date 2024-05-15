import { Controller, Delete, Inject, Patch, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApiTags } from '@nestjs/swagger';

import { AxiosExceptionFilter } from '../filters/axios-exception.filter';

import { apiGatewayConfig } from '@project/api-gateway-config';
import { ConfigType } from '@nestjs/config';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { InjectUserIdInterceptor } from '@project/interceprots';


@ApiTags('Api-gateway: posts')
@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class PostsController {
  constructor(
    private readonly httpService: HttpService,

    @Inject(apiGatewayConfig.KEY)
    private readonly config: ConfigType<typeof apiGatewayConfig>
  ){}

  @Post('/')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async create() {

  }

  @Post('repost')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async repost() {

  }

  @Patch('update')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async update() {

  }

  @Delete('delete')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async delete() {

  }

  @Post('toggle-like')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async toggleLike() {

  }

  @Post('comments')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async addComment() {

  }

  @Delete('comments')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async deleteComment() {

  }
}
