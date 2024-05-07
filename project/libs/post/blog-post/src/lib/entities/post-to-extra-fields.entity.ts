import { BasePostInterface, Entity, PostToExtraFieldsInterface, PostTypeEnum, StorableEntity } from '@project/shared/core';

export class PostToExtraFieldsEntity extends Entity implements PostToExtraFieldsInterface, StorableEntity<PostToExtraFieldsInterface>{
  public createdAt: Date;
  public updatedAt: Date;
  public postId: BasePostInterface['id'];
  public postType: PostTypeEnum;
  public extraFieldsId: string;

  constructor(postRelation: PostToExtraFieldsInterface) {
    super();

    if(!postRelation) {
      return;
    }

    this.id = postRelation.id;
    this.createdAt = postRelation.createdAt;
    this.updatedAt = postRelation.updatedAt;
    this.postId = postRelation.postId;
    this.postType = postRelation.postType;
    this.extraFieldsId = postRelation.extraFieldsId;
  }

  toPOJO(): PostToExtraFieldsInterface {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postId: this.postId,
      postType: this.postType,
      extraFieldsId: this.extraFieldsId
    };
  }
}
