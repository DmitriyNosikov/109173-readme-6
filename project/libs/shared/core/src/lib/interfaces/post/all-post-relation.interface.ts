import { PostTypeEnum } from '../../types/post/post-type.enum';
export interface AllPostRelationInterface {
  id?: string;
  postId: string;
  postType: PostTypeEnum;
  extraFieldsId: string;
}
