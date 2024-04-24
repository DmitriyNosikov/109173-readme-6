import {
  Entity,
  PostTypeEnum,
  StorableEntity,
  BasePostInterface,
  ExtraFields,
  UserInterface,
  TagInterface,
  CommentInterface,
  LikeInterface
} from '@project/shared/core'
import { getdate } from '@project/shared/helpers'

export class BasePostEntity extends Entity implements BasePostInterface, StorableEntity<BasePostInterface> {
  public createdAt?: string;
  public updatedAt?: string;
  public publishedAt?: string;

  public type: PostTypeEnum;
  public tags?: TagInterface[] | null;
  public comments?: CommentInterface[] | null;
  public likes?: LikeInterface[] | null;
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
    this.createdAt = String(post.createdAt ?? getdate());
    this.updatedAt = String(post.updatedAt);
    this.publishedAt = String(post.publishedAt);

    this.type = post.type;
    this.tags = post.tags ?? null;
    this.comments = post.comments ?? null;
    this.likes = post.likes ?? null;
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
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      publishedAt: this.publishedAt,

      type: this.type,
      tags: this.tags,
      comments: this.comments,
      likes: this.likes,
      isPublished: this.isPublished,
      isRepost: this.isRepost,
      authorId: this.authorId,
      originAuthorId: this.originAuthorId,
      originPostId: this.originPostId,
      extraFields: this.extraFields,
    };
  }
}
