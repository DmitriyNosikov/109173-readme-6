import { CreatedUpdatedDatesInterface } from '@project/shared/core';

export interface PostNotifyInterface extends CreatedUpdatedDatesInterface {
  id?: string;
  postIds?: string[];
}
