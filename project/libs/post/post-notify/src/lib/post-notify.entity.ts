import { Entity, StorableEntity } from '@project/shared/core';
import { PostNotifyInterface } from './post-notify.interface'

export class PostNotifyEntity extends Entity implements PostNotifyInterface, StorableEntity<PostNotifyInterface> {
  public createdAt: Date;
  public updatedAt: Date;
  public postIds?: string[];

  constructor(notify: PostNotifyInterface) {
    super()

    if(!notify) {
      return;
    }

    this.id = notify.id;
    this.createdAt = notify.createdAt;
    this.updatedAt = notify.updatedAt;

    this.postIds = notify.postIds;
  }

  public toPOJO(): PostNotifyInterface {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postIds: this.postIds,
    };
  }
}
