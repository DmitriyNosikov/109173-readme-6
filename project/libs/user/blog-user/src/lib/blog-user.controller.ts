import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { BlogUserService } from './blog-user.service';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { BlogUserEntity } from './blog-user.entity';
import { fillDTO } from '@project/shared/helpers'
import { UserRDO } from './rdo/user.rdo';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class BlogUserController {
  constructor(
    private readonly blogUserService: BlogUserService
  ){}

  @Get(':userId')
  public async show(@Param('userId') userId: string) {
    const user = await this.blogUserService.getUser(userId);

    return fillDTO(UserRDO, user.toPOJO());
  }

  @Patch(':userId')
  public async updateUser(
    @Param('userId') userId: string,
    @Body() dto: UpdateUserDTO
  ): Promise<BlogUserEntity> {
    const { email, name, avatar } = dto;
    const updatedUser = await this.blogUserService.updateUser(userId, { email, name, avatar });

    return updatedUser;
  }

  @Delete(':userId')
  public async deleteUser(@Param('userId') userId: string): Promise<void> {
    await this.blogUserService.deleteUser(userId);
  }

  @Patch('password/:userId')
  public async changePassword(
    @Param('userId') userId: string,
    @Body() dto: ChangePasswordDTO
  ): Promise<BlogUserEntity> {
    const { password, newPassword } = dto;
    const updatedUser = await this.blogUserService.changePassword(userId, password, newPassword);

    return updatedUser;
  }
}
