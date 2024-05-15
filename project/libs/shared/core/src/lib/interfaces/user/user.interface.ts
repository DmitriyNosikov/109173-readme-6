import { CreatedUpdatedDatesInterface } from '../created-updated-dates.interface';

export interface UserInterface extends CreatedUpdatedDatesInterface {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  subscriptions?: string[];
}
