import { CreatedUpdatedDatesInterface } from '../../../../shared/core/src/lib/interfaces/created-updated-dates.interface';

export interface TagInterface extends CreatedUpdatedDatesInterface {
  id?: string;
  name: string;
}
