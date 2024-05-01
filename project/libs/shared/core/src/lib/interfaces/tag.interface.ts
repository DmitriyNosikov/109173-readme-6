import { CreatedUpdatedDatesInterface } from './created-updated-dates.interface';

export interface TagInterface extends CreatedUpdatedDatesInterface {
  id?: string;
  name: string;
}
