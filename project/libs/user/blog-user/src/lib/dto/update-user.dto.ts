import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDTO {
  @ApiProperty({
    description: 'User email',
    example: 'iron-man@starkindustries.it'
  })
  email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Tony',
    minimum: 3,
    maximum: 50
  })
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Stark',
    minimum: 3,
    maximum: 50
  })
  lastName: string;

  @ApiProperty({
    description: 'User avatar',
    example: '/playboy/millioner/philanthropist.jpeg'
  })
  avatar?: string;
}
