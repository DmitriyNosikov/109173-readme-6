import { Injectable } from '@nestjs/common'
import { LikeRepository } from './like.repository';
import { LikeFactory } from './like.factory';
import { CreateLikeDTO } from './dto/create-like.dto';
import { LikeEntity } from './like.entity';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly likeFactory: LikeFactory,
  ){}

  async toggleLike(postId: string, dto: CreateLikeDTO): Promise<LikeEntity | void> {
    const likeEntity = this.likeFactory.create({ postId, ...dto });
    const like = await this.likeRepository.toggleLike(likeEntity);

    return like;
  }

  async getLikesByPostId(postId: string):  Promise<LikeEntity[] | null> {
    const likes = this.likeRepository.findByPostId(postId);

    return likes;
  }


  async getLikesByAuthorId(authorId: string):  Promise<LikeEntity[] | null> {
    const likes = this.likeRepository.findByAuthorId(authorId);

    return likes;
  }
}
