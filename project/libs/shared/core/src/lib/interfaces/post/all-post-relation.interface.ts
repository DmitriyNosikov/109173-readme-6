import { PostTypeEnum } from '../../types/post/post-type.enum';
import { CreatedUpdatedDatesInterface } from '../created-updated-dates.interface';
export interface AllPostRelationInterface extends CreatedUpdatedDatesInterface {
  id?: string;
  postId: string;
  postType: PostTypeEnum;
  extraFieldsId: string;
}
