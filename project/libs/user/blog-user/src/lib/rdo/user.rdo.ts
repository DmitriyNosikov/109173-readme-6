import { Expose } from 'class-transformer';

export class UserRDO {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  avatar?: string;
}
