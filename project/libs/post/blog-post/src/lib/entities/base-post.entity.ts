import {
  Entity,
  PostTypeEnum,
  StorableEntity,
  BasePostInterface,
  UserInterface,
  PostToExtraFieldsInterface
} from '@project/shared/core'

import { TagInterface, TagEntity, TagFactory } from '@project/tag';
import { CommentEntity, CommentFactory, CommentInterface } from '@project/post/comment'
import { LikeEntity, LikeInterface } from '@project/post/like'
import { LikeFactory } from 'libs/post/like/src/lib/like.factory';

import { PostToExtraFieldsEntity } from './post-to-extra-fields.entity';
import { PostToExtraFieldsFactory } from '../factories/post-to-extra-fields';
import { PostEntities } from '../types/entities.enum';

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
  public likes: LikeEntity[] | undefined;

  // т.к. в будущем мы подразумеваем, что одному посту
  // может соответствовать несколько типов доп. полей
  // (видео, фото, текст), то сразу закладываем такую возможность
  public postToExtraFields?: PostToExtraFieldsEntity[] | undefined;

  // Поле введено для корректной отдачи поста
  // с доп. полями при конвертации в toPOJO()
  public extraFields?: PostEntities[] | undefined;

  constructor(post?: BasePostInterface) {
    super();
    this.populate(post);
  }

  public populate(post?: BasePostInterface) {
    if(!post) {
      return;
    }

    this.id = post.id;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.publishedAt = post.publishedAt;

    this.type = post.type;
    this.isPublished = post.isPublished ?? false;
    this.isRepost = post.isRepost ?? false;
    this.authorId = post.authorId;
    this.originAuthorId = post.originAuthorId;
    this.originPostId = post.originPostId;

    this.tags = [];
    this.comments = [];
    this.likes = [];
    this.postToExtraFields = [];

    // Заполняем теги
    if(post.tags) {
      this.fillTags(post.tags);
    }

    // Заполняем комментарии
    if(post.comments) {
      this.fillComments(post.comments)
    }

    // Заполняем лайки
    if(post.likes) {
      this.fillLikes(post.likes)
    }

    // Заполняем отношения Post to ExtraFields
    if(post.postToExtraFields) {
      this.fillPostToExtraFields(post.postToExtraFields)
    }
  }

  public toPOJO(): BasePostInterface {
    const basePost = {
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
      likes: this.likes.map((like) => like.toPOJO()),
      postToExtraFields: this.postToExtraFields.map((item) => item.toPOJO()),
    };

    if(this.extraFields) {
      basePost['extraFields'] = this.extraFields.map((extraField) => extraField.toPOJO());
    }

    return basePost;
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

  private fillLikes(likes: LikeInterface[]): void {
    const likesFactory = new LikeFactory();

    for(const like of likes) {
      const likeEntity = likesFactory.create(like);

      this.likes.push(likeEntity);
    }
  }

  private fillPostToExtraFields(postToExtraFields: PostToExtraFieldsInterface[]): void {
    const postToExtraFieldsFactory = new PostToExtraFieldsFactory();

    for(const item of postToExtraFields) {
      const postToExtraFieldsEntity = postToExtraFieldsFactory.create(item);

      this.postToExtraFields.push(postToExtraFieldsEntity);
    }
  }
}
