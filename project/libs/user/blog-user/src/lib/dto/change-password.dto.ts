import { ApiProperty } from '@nestjs/swagger'

export class ChangePasswordDTO {
  @ApiProperty({
    description: 'User avatar',
    example: 'jarvis-iron-hearth123',
    minimum: 6,
    maximum: 12
  })
  password: string;

  @ApiProperty({
    description: 'New user password',
    example: 'jarvis-iron-hearth123',
    minimum: 6,
    maximum: 12
  })
  newPassword: string;
}
