import { Expose } from 'class-transformer';

export class CreateTagRDO {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
