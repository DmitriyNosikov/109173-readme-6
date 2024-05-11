import { Injectable } from "@nestjs/common";
import { EntityFactory } from '@project/shared/core';
import { PostNotifyEntity } from './post-notify.entity';
import { PostNotifyInterface } from './post-notify.interface';

@Injectable()
export class PostNotifyFactory implements EntityFactory<PostNotifyEntity> {
  public create(entityPlainData: PostNotifyInterface): PostNotifyEntity {
    return new PostNotifyEntity(entityPlainData);
  }
}
