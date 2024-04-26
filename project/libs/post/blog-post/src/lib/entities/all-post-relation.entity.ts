import { AllPostRelationInterface, BasePostInterface, Entity, StorableEntity } from '@project/shared/core';

export class AllPostRelationEntity extends Entity implements AllPostRelationInterface, StorableEntity<AllPostRelationInterface>{
  public createdAt: Date;
  public updatedAt: Date;
  public postId: BasePostInterface['id'];
  public postType: BasePostInterface['type'];
  public extraFieldsId: string;

  constructor(postRelation: AllPostRelationInterface) {
    super();

    if(!postRelation) {
      return;
    }

    this.id = postRelation.id ?? undefined;
    this.createdAt = postRelation.createdAt;
    this.updatedAt = postRelation.updatedAt;
    this.postId = postRelation.postId;
    this.postType = postRelation.postType;
    this.extraFieldsId = postRelation.extraFieldsId;
  }

  toPOJO(): AllPostRelationInterface {
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
