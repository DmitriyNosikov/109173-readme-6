import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger'
export class EmailSubscriberRDO {
  @ApiProperty({
    description: 'Uniq subscriber ID',
    example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Created at date',
    example: '2024-04-26 13:02:24.847'
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Updated at date',
    example: '2024-04-26 13:02:24.847'
  })
  @Expose()
  updatedAt: Date;

  @ApiProperty({
    description: 'Subscriber email',
    example: 'iron-man@starkindustries.it'
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'Subscriber first name',
    example: 'Tony'
  })
  @Expose()
  firstName: string;

  @ApiProperty({
    description: 'Subscriber last name',
    example: 'Stark'
  })
  @Expose()
  lastName: string;
}
