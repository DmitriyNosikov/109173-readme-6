import { Body, Controller, Delete, Get, Param, Patch, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger'
import { BlogUserService } from './blog-user.service';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { fillDTO } from '@project/shared/helpers'
import { UserRDO } from './rdo/user.rdo';
import { UpdateUserDTO } from './dto/update-user.dto';
import { BlogUserMessage } from './blog-user.constant';

@Controller('users')
export class BlogUserController {
  constructor(
    private readonly blogUserService: BlogUserService
  ){}

  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: BlogUserMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogUserMessage.ERROR.NOT_FOUND
  })
  @Get(':userId')
  public async show(@Param('userId') userId: string): Promise<UserRDO | UserRDO[]> {
    const user = await this.blogUserService.getUser(userId);

    return fillDTO(UserRDO, user.toPOJO());
  }

  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.CREATED,
    description: BlogUserMessage.SUCCESS.UPDATED
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BlogUserMessage.ERROR.CANT_UPDATE
  })
  @Patch(':userId')
  public async updateUser(
    @Param('userId') userId: string,
    @Body() dto: UpdateUserDTO
  ): Promise<UserRDO | UserRDO[]> {
    const { email, firstName, lastName, avatar } = dto;
    const updatedUser = await this.blogUserService.updateUser(userId, { email, firstName, lastName, avatar });

    return fillDTO(UserRDO, updatedUser.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogUserMessage.SUCCESS.DELETED
  })
  @Delete(':userId')
  public async deleteUser(@Param('userId') userId: string): Promise<void> {
    await this.blogUserService.deleteUser(userId);
  }

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
  @Patch('password/:userId')
  public async changePassword(
    @Param('userId') userId: string,
    @Body() dto: ChangePasswordDTO
  ): Promise<UserRDO | UserRDO[]> {
    const { password, newPassword } = dto;
    const updatedUser = await this.blogUserService.changePassword(userId, password, newPassword);

    return fillDTO(UserRDO, updatedUser.toPOJO());
  }
}
