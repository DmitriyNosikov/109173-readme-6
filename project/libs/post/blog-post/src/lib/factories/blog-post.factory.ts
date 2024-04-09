import { Injectable } from '@nestjs/common';
import { PostTypeEnum } from '@project/shared/core';
import { FactoryType } from '../types/factories.enum';

@Injectable()
export class BlogPostFactory {
  public getFactoryInstance(postType: PostTypeEnum) {
    if(!FactoryType[postType]) {
      return;
    }

    const postFactory = FactoryType[postType];
    const postFactoryInstance = new postFactory();

    return postFactoryInstance;
  }

  public create(entityPlainData) {
    const postFactoryInstance = this.getFactoryInstance(entityPlainData.type);
    const postEntity = postFactoryInstance.create(entityPlainData);

    return postEntity;
  }

}
