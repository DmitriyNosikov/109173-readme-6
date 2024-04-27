import { Expose } from 'class-transformer';

export class CreateTagRDO {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  name: string;
}
