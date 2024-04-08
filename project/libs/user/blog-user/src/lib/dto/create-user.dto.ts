import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDTO {
  @ApiProperty({
    description: 'User email',
    example: 'iron-man@starkindustries.it'
  })
  email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Tony Stark',
    minimum: 3,
    maximum: 50
  })
  name: string;

  @ApiProperty({
    description: 'User avatar',
    example: '/playboy/millioner/philanthropist.jpeg'
  })
  avatar?: string;

  @ApiProperty({
    description: 'User password',
    example: 'jarvis-iron-hearth123',
    minimum: 6,
    maximum: 12
  })
  password: string;
}
