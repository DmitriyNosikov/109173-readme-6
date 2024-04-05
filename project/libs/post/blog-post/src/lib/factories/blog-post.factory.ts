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

type PostsTypes = PostLinkInterface & PostTextInterface & PostQuoteInterface & PostPhotoInterface & PostVideoInterface;
type FactoriesTypes = typeof PostLinkFactory  | typeof PostTextFactory  | typeof PostQuoteFactory | typeof PostPhotoFactory | typeof PostVideoFactory;

export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  // Типы фаблик { тип_поста: конструктор_фабрики }
  private factoriesTypes: Map<PostTypeEnum, FactoriesTypes> = new Map();

  constructor() {
    this.factoriesTypes.set(PostType.LINK, PostLinkFactory)
    this.factoriesTypes.set(PostType.TEXT, PostTextFactory)
    this.factoriesTypes.set(PostType.QUOTE, PostQuoteFactory)
    this.factoriesTypes.set(PostType.PHOTO, PostPhotoFactory)
    this.factoriesTypes.set(PostType.VIDEO, PostVideoFactory)
  }

  public getFactoryInstance(postType: PostTypeEnum) {
    if(!this.factoriesTypes.has(postType)) {
      return;
    }

    const postFactory = this.factoriesTypes.get(postType);
    const postFactoryInstance =  new postFactory();

    return postFactoryInstance;
  }

  public create(entityPlainData: PostsTypes) {
    const postFactory = this.getFactoryInstance(entityPlainData.type);
    const postEntity = postFactory.create(entityPlainData);

    return postEntity;
  }
}
