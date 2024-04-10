import {
  Entity,
  PostTypeEnum,
  StorableEntity,
  BasePostInterface,
  ExtraFields,
  UserInterface
} from '@project/shared/core'
import { getdate } from '@project/shared/helpers'

export class BasePostEntity extends Entity implements BasePostInterface, StorableEntity<BasePostInterface> {
  public type: PostTypeEnum;
  public tags: string[];
  public publishedAt: string;
  public createdAt: string;
  public isPublished: boolean;
  public isRepost: boolean;
  public authorId: UserInterface['id'];
  public originAuthorId: UserInterface['id'] | null;
  public originPostId: BasePostInterface['id'] | null;
  public extraFields: ExtraFields;

  constructor(post?: BasePostInterface) {
    super();
    this.populate(post);
  }

  public populate(post?: BasePostInterface) {
    if(!post) {
      return;
    }

    this.id = post.id ?? '';
    this.type = post.type;
    this.tags = post.tags;
    this.publishedAt = post.publishedAt ?? getdate();
    this.createdAt = post.createdAt ?? getdate();
    this.isPublished = post.isPublished ?? false;
    this.isRepost = post.isRepost ?? false;
    this.authorId = post.authorId ?? '';
    this.originAuthorId = post.originAuthorId ?? '';
    this.originPostId = post.originPostId ?? '';
    this.extraFields = post.extraFields;
  }

  public toPOJO(): BasePostInterface {
    return {
      id: this.id,
      type: this.type,
      tags: this.tags,
      publishedAt: this.publishedAt,
      createdAt: this.createdAt,
      isPublished: this.isPublished,
      isRepost: this.isRepost,
      authorId: this.authorId,
      originAuthorId: this.originAuthorId,
      originPostId: this.originPostId,
      extraFields: this.extraFields,
    };
  }
}
