import { AllPostRelationInterface, BasePostInterface, Entity } from '@project/shared/core';

export class AllPostRelationEntity extends Entity implements AllPostRelationInterface{
  constructor(
    public postId: BasePostInterface['id'],
    public postType: BasePostInterface['type'],
    public extraFieldsId: string,
  ) {
    super();
  }

  get id(): string {
    return [this.postId, this.postType, this.extraFieldsId].join('');
  }
}
