import { Entity, PostInterface, PostTypeEnum, StorableEntity, UserInterface } from '@project/shared/core'
import { getdate } from '@project/shared/helpers'

export class BlogPostEntity extends Entity implements StorableEntity<PostInterface> {
  public type: PostTypeEnum;
  public tags: string[];
  public publishedAt: string;
  public createdAt: string;
  public isPublished: boolean;
  public isRepost: boolean;
  public authorId: UserInterface['id'];
  public originAuthorId: UserInterface['id'] | null;
  public originPostId: PostInterface['id'] | null;

  constructor(post?: PostInterface) {
    super();
    this.populate(post);
  }

  public populate(post?: PostInterface) {
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
  }

  public toPOJO(): PostInterface {
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
    };
  }
}
