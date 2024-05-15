import { ApiProperty } from '@nestjs/swagger';
import { UserRDO } from './user.rdo';
import { Expose } from 'class-transformer';

export class UserWithSubscribersRDO extends UserRDO {
  @ApiProperty({
    description: 'User subscribers count',
    example: '999',
  })
  @Expose()
  subscribersCount?: number;
}
