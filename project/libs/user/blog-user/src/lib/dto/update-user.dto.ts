import { ApiProperty } from '@nestjs/swagger'
import { BlogUserValidation } from '../blog-user.constant';
import { IsArray, IsEmail, IsMongoId, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({
    description: 'User email',
    example: 'iron-man@starkindustries.it'
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Tony',
    minimum: BlogUserValidation.FIRST_NAME.MIN_LENGTH,
    maximum: BlogUserValidation.FIRST_NAME.MAX_LENGTH
  })
  @MaxLength(BlogUserValidation.FIRST_NAME.MAX_LENGTH)
  @MinLength(BlogUserValidation.FIRST_NAME.MIN_LENGTH)
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Stark',
    minimum: BlogUserValidation.FIRST_NAME.MIN_LENGTH,
    maximum: BlogUserValidation.FIRST_NAME.MAX_LENGTH
  })
  @MaxLength(BlogUserValidation.FIRST_NAME.MAX_LENGTH)
  @MinLength(BlogUserValidation.FIRST_NAME.MIN_LENGTH)
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    description: 'User avatar',
    example: '/playboy/millioner/philanthropist.jpeg'
  })
  @IsOptional()
  avatar?: string;

  @ApiProperty({
    description: 'User subscriptions to other users',
    example: '[ "6643e2ad76870c402e3e1019", "6643e2ad76870c402e3e1019" ]'
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  subscriptions?: string[];
}
