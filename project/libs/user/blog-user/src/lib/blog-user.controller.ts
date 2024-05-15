import { Body, Controller, Delete, Get, Param, Patch, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { fillDTO } from '@project/shared/helpers'
import { MongoIdValidationPipe } from '@project/shared/pipes'

import { BlogUserMessage } from './blog-user.constant';
import { BlogUserService } from './blog-user.service';

import { ChangePasswordDTO } from './dto/change-password.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserRDO } from './rdo/user.rdo';
import { UserWithSubscribersRDO } from './rdo/user-with.subscribers.rdo';

@ApiTags('users')
@Controller('users')
export class BlogUserController {
  constructor(
    private readonly blogUserService: BlogUserService
  ){}

  @Post('/')
  @ApiOperation({ summary: BlogUserMessage.DESCRIPTION.USER_DETAIL })
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: BlogUserMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogUserMessage.ERROR.NOT_FOUND
  })
  public async show(@Body('userId') userId: string): Promise<UserWithSubscribersRDO> {
    const userDetail = await this.blogUserService.getUserDetail(userId);
    const userWithSubscribersCount = {
      ...userDetail.user.toPOJO(),
      subscribersCount: userDetail.subscribersCount
    }

    return fillDTO(UserWithSubscribersRDO, userWithSubscribersCount);
  }

  @Patch(':userId')
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.CREATED,
    description: BlogUserMessage.SUCCESS.UPDATED
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BlogUserMessage.ERROR.CANT_UPDATE
  })
  public async updateUser(
    @Param('userId', MongoIdValidationPipe) userId: string,
    @Body() dto: UpdateUserDTO
  ): Promise<UserRDO | UserRDO[]> {
    const { email, firstName, lastName, avatar } = dto;
    const updatedUser = await this.blogUserService.updateUser(userId, { email, firstName, lastName, avatar });

    return fillDTO(UserRDO, updatedUser.toPOJO());
  }

  @Delete(':userId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogUserMessage.SUCCESS.DELETED
  })
  public async deleteUser(@Param('userId', MongoIdValidationPipe) userId: string): Promise<void> {
    await this.blogUserService.deleteUser(userId);
  }

  @Patch('/:userId/password/')
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.CREATED,
    description: BlogUserMessage.SUCCESS.UPDATED
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogUserMessage.ERROR.INCORRECT_CREDENTIALS
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogUserMessage.ERROR.NOT_FOUND
  })
  public async changePassword(
    @Param('userId', MongoIdValidationPipe) userId: string,
    @Body() dto: ChangePasswordDTO
  ): Promise<UserRDO | UserRDO[]> {
    const { password, newPassword } = dto;
    const updatedUser = await this.blogUserService.changePassword(userId, password, newPassword);

    return fillDTO(UserRDO, updatedUser.toPOJO());
  }

  @Get('/:userId/subscribers')
  @ApiOperation({ summary: BlogUserMessage.DESCRIPTION.USER_SUBSCRIBERS })
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: BlogUserMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogUserMessage.ERROR.INCORRECT_CREDENTIALS
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogUserMessage.ERROR.NOT_FOUND
  })
  public async getSubscribers( @Param('userId', MongoIdValidationPipe) userId: string ): Promise<UserRDO | UserRDO[]> {
    const subscribers = await this.blogUserService.getUserSubscribers(userId);
    const userSunscribers = subscribers.map((subscriber) => subscriber.toPOJO());


    return fillDTO(UserRDO, userSunscribers);
  }

  @Post('/:userId/subscribe/:targetUserId')
  @ApiOperation({ summary: BlogUserMessage.DESCRIPTION.SUBSCRIBE })
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.CREATED,
    description: BlogUserMessage.SUCCESS.UPDATED
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogUserMessage.ERROR.INCORRECT_CREDENTIALS
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogUserMessage.ERROR.NOT_FOUND
  })
  public async subscribe(
    @Param('userId', MongoIdValidationPipe) userId: string,
    @Param('targetUserId', MongoIdValidationPipe) targetUserId: string,
  ): Promise<UserRDO | UserRDO[]> {
    const updatedUser = await this.blogUserService.addSubscription(userId, targetUserId);

    return fillDTO(UserRDO, updatedUser.toPOJO());
  }

  @Post('/:userId/unsubscribe/:targetUserId')
  @ApiOperation({ summary: BlogUserMessage.DESCRIPTION.UNSUBSCRIBE })
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.CREATED,
    description: BlogUserMessage.SUCCESS.UPDATED
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogUserMessage.ERROR.INCORRECT_CREDENTIALS
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogUserMessage.ERROR.NOT_FOUND
  })
  public async unsubscribe(
    @Param('userId', MongoIdValidationPipe) userId: string,
    @Param('targetUserId', MongoIdValidationPipe) targetUserId: string,
  ): Promise<UserRDO | UserRDO[]> {
    const updatedUser = await this.blogUserService.removeSubscription(userId, targetUserId);

    return fillDTO(UserRDO, updatedUser.toPOJO());
  }
}
