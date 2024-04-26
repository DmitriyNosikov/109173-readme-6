import {
  Entity,
  PostTypeEnum,
  StorableEntity,
  BasePostInterface,
  UserInterface,
  CommentInterface,
  LikeInterface
} from '@project/shared/core'

export class BasePostEntity extends Entity implements BasePostInterface, StorableEntity<BasePostInterface> {
  public createdAt: Date;
  public updatedAt: Date;
  public publishedAt: Date;

  public type: PostTypeEnum;
  public tags?: string[] | null;
  public comments?: CommentInterface[] | undefined;
  public likes?: LikeInterface[] | undefined;
  public isPublished: boolean;
  public isRepost: boolean;
  public authorId: UserInterface['id'];
  public originAuthorId: UserInterface['id'] | undefined;
  public originPostId: BasePostInterface['id'] | undefined;

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
    this.publishedAt = post.publishedAt;

    this.type = post.type;
    this.tags = post.tags ?? undefined;
    this.comments = post.comments ?? undefined;
    this.likes = post.likes ?? undefined;
    this.isPublished = post.isPublished ?? false;
    this.isRepost = post.isRepost ?? false;
    this.authorId = post.authorId ?? '';
    this.originAuthorId = post.originAuthorId ?? '';
    this.originPostId = post.originPostId ?? '';
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
      originPostId: this.originPostId
    };
  }
}
