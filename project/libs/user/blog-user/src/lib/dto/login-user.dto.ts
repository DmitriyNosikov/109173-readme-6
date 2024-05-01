import { ApiProperty } from '@nestjs/swagger'
import { BlogUserValidation } from '../blog-user.constant';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDTO {
  @ApiProperty({
    description: 'User email',
    example: 'iron-man@starkindustries.it'
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'jarvis-iron-hearth123',
    minimum: BlogUserValidation.PASSWORD.MAX_LENGTH,
    maximum: BlogUserValidation.PASSWORD.MIN_LENGTH
  })
  @MaxLength(BlogUserValidation.PASSWORD.MAX_LENGTH)
  @MinLength(BlogUserValidation.PASSWORD.MIN_LENGTH)
  @IsString()
  password: string;
}
