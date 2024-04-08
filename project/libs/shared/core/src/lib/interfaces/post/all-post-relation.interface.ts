import { BasePostInterface } from './base-post.interface';

export interface AllPostRelationInterface {
  postId: string;
  postType: BasePostInterface['type'];
  extraFieldsId: string;
}
