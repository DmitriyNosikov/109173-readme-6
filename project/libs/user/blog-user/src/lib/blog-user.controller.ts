import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { BlogUserService } from './blog-user.service';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { BlogUserEntity } from './blog-user.entity';

@Controller('users')
export class BlogUserController {
  constructor(
    private readonly blogUserService: BlogUserService
  ){}

  @Get(':userId')
  public async show(@Param('userId') userId: string) {
    const user = await this.blogUserService.getUser(userId);

    return user.toPOJO();
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
