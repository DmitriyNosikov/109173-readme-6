import { AllPostRelationInterface, BasePostInterface, Entity, StorableEntity } from '@project/shared/core';

export class AllPostRelationEntity extends Entity implements AllPostRelationInterface, StorableEntity<AllPostRelationInterface>{
  public postId: BasePostInterface['id'];
  public postType: BasePostInterface['type'];
  public extraFieldsId: string;

  constructor(postRelation: AllPostRelationInterface) {
    super();

    if(!postRelation) {
      return;
    }

    this.id = postRelation.id ?? undefined;
    this.postId = postRelation.postId;
    this.postType = postRelation.postType;
    this.extraFieldsId = postRelation.extraFieldsId;
  }

  toPOJO(): AllPostRelationInterface {
    return {
      id: this.id,
      postId: this.postId,
      postType: this.postType,
      extraFieldsId: this.extraFieldsId
    };
  }
}
