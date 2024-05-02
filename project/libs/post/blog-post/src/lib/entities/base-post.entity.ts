import {
  Entity,
  PostTypeEnum,
  StorableEntity,
  BasePostInterface,
  UserInterface,
  LikeInterface
} from '@project/shared/core'
import { TagInterface, TagEntity, TagFactory } from '@project/tag';
import { CommentEntity, CommentFactory, CommentInterface } from '@project/post/comment'
export class BasePostEntity extends Entity implements BasePostInterface, StorableEntity<BasePostInterface> {
  public createdAt: Date;
  public updatedAt: Date;
  public publishedAt: Date;

  public type: PostTypeEnum;
  public authorId: UserInterface['id'];
  public isPublished: boolean;

  public isRepost: boolean;
  public originAuthorId: UserInterface['id'] | undefined;
  public originPostId: BasePostInterface['id'] | undefined;

  public tags: TagEntity[] | undefined;
  public comments: CommentEntity[] | undefined;
  public likes: LikeInterface[] | undefined;
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
    this.publishedAt = post.publishedAt;

    this.type = post.type;
    this.isPublished = post.isPublished ?? false;
    this.isRepost = post.isRepost ?? false;
    this.authorId = post.authorId ?? '';
    this.originAuthorId = post.originAuthorId ?? undefined;
    this.originPostId = post.originPostId ?? undefined;

    this.tags = [];
    this.comments = [];
    this.likes = [];

    // Заполняем теги
    if(post.tags) {
      this.fillTags(post.tags);
    }

    // Заполняем комментарии
    if(post.comments) {
      this.fillComments(post.comments)
    }

    // Лайки пока оставляем так
    this.likes = post.likes ?? undefined;
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

      tags: this.tags.map((tag) => tag.toPOJO()),
      comments: this.comments.map((comment) => comment.toPOJO()),
      likes: this.likes,
    };
  }

  private fillTags(tags: TagInterface[]): void {
    const tagfactory = new TagFactory();

    for(const tag of tags) {
      const tagEntity = tagfactory.create(tag);

      this.tags.push(tagEntity);
    }
  }

  private fillComments(comments: CommentInterface[]): void {
    const commentFactory = new CommentFactory();

    for(const comment of comments) {
      const commentEntity = commentFactory.create(comment);

      this.comments.push(commentEntity);
    }
  }
}
