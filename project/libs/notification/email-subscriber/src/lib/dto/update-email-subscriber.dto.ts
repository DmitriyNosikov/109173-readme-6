import { ApiProperty } from '@nestjs/swagger'
import { SubscriberValidation } from '../email-subscriber.constant';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateEmailSubscriberDTO {
  @ApiProperty({
    description: 'Subscriber email',
    example: 'iron-man@starkindustries.it'
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Subscriber first name',
    example: 'Tony',
    minimum: SubscriberValidation.FIRST_NAME.MIN_LENGTH,
    maximum: SubscriberValidation.FIRST_NAME.MAX_LENGTH
  })
  @MaxLength(SubscriberValidation.FIRST_NAME.MAX_LENGTH)
  @MinLength(SubscriberValidation.FIRST_NAME.MIN_LENGTH)
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    description: 'Subscriber last name',
    example: 'Stark',
    minimum: SubscriberValidation.FIRST_NAME.MIN_LENGTH,
    maximum: SubscriberValidation.FIRST_NAME.MAX_LENGTH
  })
  @MaxLength(SubscriberValidation.FIRST_NAME.MAX_LENGTH)
  @MinLength(SubscriberValidation.FIRST_NAME.MIN_LENGTH)
  @IsString()
  @IsOptional()
  lastName?: string;
}
