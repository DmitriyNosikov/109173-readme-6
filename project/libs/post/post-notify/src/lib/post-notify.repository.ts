import { BasePostgresRepository } from '@project/shared/data-access';
import { PostNotifyEntity } from './post-notify.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PostNotifyFactory } from './post-notify.factory';
import { PrismaClientService } from '@project/blog/models';
import { PostNotifyInterface } from './post-notify.interface';

@Injectable()
export class PostNotifyRepository extends BasePostgresRepository<PostNotifyEntity, PostNotifyInterface> {
  constructor(
    entityFactory: PostNotifyFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }

  public async create(entity: PostNotifyEntity): Promise<PostNotifyEntity> {
    let postIds = undefined;

    if(entity.postIds) {
      postIds = entity.postIds.map((postId) => ({ id: postId }));
    }

    const document = await this.dbClient.postNotification.create({
      data: {
        posts: postIds ? {
          connect: postIds
        } : undefined
      }
    });

    entity.id = document.id;
    entity.createdAt = document.createdAt;
    entity.updatedAt = document.updatedAt;

    return entity;
  }

  public async findLast(): Promise<PostNotifyEntity | null> {
    const document = await this.dbClient.postNotification.findFirst({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        posts: true
      }
    });

    if(!document) {
      return;
    }

    const lastPostNotification = this.createEntityFromDocument(document);

    if(document.posts) {
      lastPostNotification.postIds = document.posts.map((post) => post.id);
    }

    return lastPostNotification;
  }

  public async deleteById(id: string): Promise<void> {
    await this.dbClient.postNotification.delete({
      where: { id }
    });
  }

  public async exists(id: string): Promise<PostNotifyEntity | null> {
    const document = await this.dbClient.postNotification.findFirst({
      where: { id }
    });

    if(!document) {
      throw new NotFoundException(`Can't find Post Notification with id ${id}`);
    }

    const postNotification = this.createEntityFromDocument(document);

    return postNotification;
  }
}
