import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common'
import { LikeService } from './like.service'
import { CreateLikeRDO } from './rdo/create-like.rdo'
import { CreateLikeDTO } from './dto/create-like.dto';
import { fillDTO } from '@project/shared/helpers';
import { LikeMessage } from './like.constant';

@ApiTags('likes')
@Controller('posts/:postId/likes')
export class LikeController {
  constructor(
    private readonly likeService: LikeService
  ){}

  // @UseGuards(JWTAuthGuard)
  @Post('/')
  @ApiOperation({ summary: LikeMessage.DESCRIPTION.TOGGLE })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: LikeMessage.SUCCESS.CREATED,
    type: CreateLikeRDO
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: LikeMessage.ERROR.UNAUTHORIZED
  })
  @ApiParam({
    name: "postId",
    required: true,
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: LikeMessage.DESCRIPTION.POST_ID
  })
  @ApiBody({
    required: true,
    type: CreateLikeDTO
  })
  public async toggleLike(@Param('postId') postId: string, @Body() dto: CreateLikeDTO ): Promise<CreateLikeRDO> {
    const like = await this.likeService.toggleLike(postId, dto);

    if(!like) {
      return null;
    }

    return fillDTO(CreateLikeRDO, like.toPOJO())
  }

  // @UseGuards(JWTAuthGuard)
  @Get('/')
  @ApiOperation({ summary: LikeMessage.DESCRIPTION.SHOW })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: LikeMessage.SUCCESS.CREATED,
    type: [CreateLikeRDO]
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: LikeMessage.ERROR.UNAUTHORIZED
  })
  @ApiParam({
    name: "postId",
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: LikeMessage.DESCRIPTION.POST_ID,
    required: true
  })
  public async show(@Param('postId') postId: string): Promise<CreateLikeRDO[] | null> {
    const likes = await this.likeService.getLikesByPostId(postId)

    if(!likes) {
      return;
    }

    const result = likes.map((like) => fillDTO(CreateLikeRDO, like));

    return result;
  }

  @Get(':authorId')
  @ApiOperation({ summary: LikeMessage.DESCRIPTION.SHOW_USER_LIKES })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: LikeMessage.SUCCESS.CREATED,
    type: [CreateLikeRDO]
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: LikeMessage.ERROR.UNAUTHORIZED
  })
  @ApiParam({
    name: "authorId",
    example: '66224f68a3f9a165a1ab5fbd',
    description: LikeMessage.DESCRIPTION.POST_ID,
    required: true
  })
  public async showUsersLikes(@Param('authorId') authorId: string): Promise<CreateLikeRDO[] | null> {
    const likes = await this.likeService.getLikesByAuthorId(authorId)

    if(!likes) {
      return;
    }

    const result = likes.map((like) => fillDTO(CreateLikeRDO, like));

    return result;
  }
}
