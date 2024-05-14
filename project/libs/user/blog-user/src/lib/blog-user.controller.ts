import { Body, Controller, Delete, Get, Param, Patch, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { fillDTO } from '@project/shared/helpers'
import { MongoIdValidationPipe } from '@project/shared/pipes'

import { BlogUserMessage } from './blog-user.constant';
import { BlogUserService } from './blog-user.service';

import { ChangePasswordDTO } from './dto/change-password.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserRDO } from './rdo/user.rdo';

@ApiTags('users')
@Controller('users')
export class BlogUserController {
  constructor(
    private readonly blogUserService: BlogUserService
  ){}

  @Get(':userId')
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
  public async show(@Param('userId', MongoIdValidationPipe) userId: string): Promise<UserRDO | UserRDO[]> {
    const user = await this.blogUserService.getUser(userId);

    return fillDTO(UserRDO, user.toPOJO());
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
}
