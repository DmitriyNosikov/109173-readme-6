import { Constructor } from '@nestjs/common/utils/merge-with-values.util'
import {
  EntityFactory,
  PostLinkInterface,
  PostPhotoInterface,
  PostQuoteInterface,
  PostTextInterface,
  PostType,
  PostTypeEnum,
  PostVideoInterface
} from '@project/shared/core';
import { BlogPostEntity } from '../blog-post.entity';
import { PostLinkFactory } from './post-link.factory';
import { PostTextFactory } from './post-text.factory';
import { PostQuoteFactory } from './post-quote.factory';
import { PostPhotoFactory } from './post-photo.factory';
import { PostVideoFactory } from './post-video.factory';

type PostsTypes = PostLinkInterface  |
                  PostTextInterface  |
                  PostQuoteInterface |
                  PostPhotoInterface |
                  PostVideoInterface;

export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  // Типы фаблик { тип_поста: конструктор_фабрики }
  private factotiesTypes: Map<PostTypeEnum, Constructor<any>> = new Map();

  constructor() {
    this.factotiesTypes.set(PostType.LINK, PostLinkFactory)
    this.factotiesTypes.set(PostType.TEXT, PostTextFactory)
    this.factotiesTypes.set(PostType.QUOTE, PostQuoteFactory)
    this.factotiesTypes.set(PostType.PHOTO, PostPhotoFactory)
    this.factotiesTypes.set(PostType.VIDEO, PostVideoFactory)
  }

  public create(entityPlainData: PostsTypes): BlogPostEntity {
    const factoryType: PostTypeEnum = entityPlainData.type;

    if(!this.factotiesTypes.has(factoryType)) {
      return;
    }

    // Определяем фабрику для поста по типу переданного поста
    const postFactory = this.factotiesTypes.get(factoryType)

    return new postFactory(entityPlainData);
  }
}
