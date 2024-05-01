import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { LikeService } from './like.service'
import { CreateLikeRDO } from './rdo/create-like.rdo'
import { CreateLikeDTO } from './dto/create-like.dto';
import { fillDTO } from '@project/shared/helpers';

@Controller('posts/:postId/likes')
export class LikeController {
  constructor(
    private readonly likeService: LikeService
  ){}

  @Post('/')
  public async toggleLike(@Param('postId') postId: string, @Body() dto: CreateLikeDTO ) {
    const like = await this.likeService.toggleLike(postId, dto);

    if(!like) {
      return null;
    }

    return fillDTO(CreateLikeRDO, like.toPOJO())
  }

  @Get('/')
  public async show(@Param('postId') postId: string) {
    const likes = await this.likeService.getLikesByPostId(postId)

    return fillDTO(CreateLikeRDO, likes)
  }

  @Get(':authorId')
  public async showUsersLikes(@Param('authorId') authorId: string) {
    const likes = await this.likeService.getLikesByAuthorId(authorId)

    return fillDTO(CreateLikeRDO, likes)
  }
}
