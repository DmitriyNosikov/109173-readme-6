import {
  Entity,
  PostTypeEnum,
  StorableEntity,
  BasePostInterface,
  UserInterface,
  CommentInterface,
  LikeInterface,
  TagInterface,
  // PostToExtraFieldsInterface
} from '@project/shared/core'
// import { ExtraFields } from 'libs/shared/core/src/lib/interfaces/post/base-post.interface';

export class BasePostEntity extends Entity implements BasePostInterface, StorableEntity<BasePostInterface> {
  public createdAt: Date;
  public updatedAt: Date;
  public publishedAt?: Date;

  public type: PostTypeEnum;
  public authorId: UserInterface['id'];
  public isPublished: boolean;

  public isRepost?: boolean;
  public originAuthorId?: UserInterface['id'] | undefined;
  public originPostId?: BasePostInterface['id'] | undefined;

  public tags?: TagInterface[] | undefined;
  public comments?: CommentInterface[] | undefined;
  public likes?: LikeInterface[] | undefined;
  // public extraFields?: ExtraFields | undefined;
  // public postToExtraFields?: PostToExtraFieldsInterface[] | undefined;

  constructor(post?: BasePostInterface) {
    super();
    this.populate(post);
  }

  public populate(post?: BasePostInterface) {
    if(!post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.publishedAt = post.publishedAt ?? undefined;

    this.type = post.type;
    this.isPublished = post.isPublished ?? false;
    this.isRepost = post.isRepost ?? false;
    this.authorId = post.authorId ?? '';
    this.originAuthorId = post.originAuthorId ?? undefined;
    this.originPostId = post.originPostId ?? undefined;

    this.tags = post.tags ?? undefined;
    this.comments = post.comments ?? undefined;
    this.likes = post.likes ?? undefined;
    // this.postToExtraFields = post.postToExtraFields ?? undefined;
  }

  public toPOJO(): BasePostInterface {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      publishedAt: this.publishedAt,

      type: this.type,
      isPublished: this.isPublished,
      isRepost: this.isRepost,
      authorId: this.authorId,
      originAuthorId: this.originAuthorId,
      originPostId: this.originPostId,

      tags: this.tags,
      comments: this.comments,
      likes: this.likes,
      // postToExtraFields: this.postToExtraFields
    };
  }
}
