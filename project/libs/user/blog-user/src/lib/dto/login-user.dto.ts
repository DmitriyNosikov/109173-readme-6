import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDTO {
  @ApiProperty({
    description: 'User email',
    example: 'iron-man@starkindustries.it'
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'jarvis-iron-hearth123',
    minimum: 6,
    maximum: 12
  })
  password: string;
}
