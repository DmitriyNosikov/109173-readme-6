import { Injectable } from '@nestjs/common';
import { PostInterfaces, PostType, PostTypeEnum } from '@project/shared/core';
import { PostTextFactory } from './post-text.factory';
import { PostLinkFactory } from './post-link.factory';
import { PostQuoteFactory } from './post-quote.factory';
import { PostPhotoFactory } from './post-photo.factory';
import { PostVideoFactory } from './post-video.factory';

const FactoryType = {
  [PostType.TEXT]: PostTextFactory,
  [PostType.LINK]: PostLinkFactory,
  [PostType.QUOTE]: PostQuoteFactory,
  [PostType.PHOTO]: PostPhotoFactory,
  [PostType.VIDEO]: PostVideoFactory,
} as const;

export type PostFactoryTypes = (typeof FactoryType)[keyof typeof FactoryType];
@Injectable()
export class BlogPostFactory {
  public getFactoryInstance<T extends PostTypeEnum>(postType: T) {
    if(!FactoryType[postType]) {
      return;
    }

    const postFactory = FactoryType[postType];
    const postFactoryInstance = new postFactory();

    return postFactoryInstance;
  }

  public create(entityPlainData: PostInterfaces) {
    const postFactoryInstance = this.getFactoryInstance(entityPlainData.type);
    const postEntity = postFactoryInstance.create(entityPlainData);

    return postEntity;
  }
}
