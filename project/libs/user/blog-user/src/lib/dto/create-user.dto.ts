import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { BlogUserValidation } from '../blog-user.constant';

export class CreateUserDTO {
  @ApiProperty({
    description: 'User email',
    example: 'iron-man@starkindustries.it'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Tony',
    minimum: BlogUserValidation.FIRST_NAME.MIN_LENGTH,
    maximum: BlogUserValidation.FIRST_NAME.MAX_LENGTH
  })
  @MaxLength(BlogUserValidation.FIRST_NAME.MAX_LENGTH)
  @MinLength(BlogUserValidation.FIRST_NAME.MIN_LENGTH)
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Stark',
    minimum: BlogUserValidation.FIRST_NAME.MIN_LENGTH,
    maximum: BlogUserValidation.FIRST_NAME.MAX_LENGTH
  })
  @MaxLength(BlogUserValidation.FIRST_NAME.MAX_LENGTH)
  @MinLength(BlogUserValidation.FIRST_NAME.MIN_LENGTH)
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'User avatar',
    example: '/playboy/millioner/philanthropist.jpeg'
  })
  @IsOptional()
  avatar?: string;

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
