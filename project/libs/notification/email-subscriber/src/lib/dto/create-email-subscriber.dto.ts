import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { SubscriberValidation } from '../email-subscriber.constant';

export class CreateEmailSubscriberDTO {
  @ApiProperty({
    description: 'Subscriber email',
    example: 'iron-man@starkindustries.it'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Subscriber first name',
    example: 'Tony',
    minimum: SubscriberValidation.FIRST_NAME.MIN_LENGTH,
    maximum: SubscriberValidation.FIRST_NAME.MAX_LENGTH
  })
  @MaxLength(SubscriberValidation.FIRST_NAME.MAX_LENGTH)
  @MinLength(SubscriberValidation.FIRST_NAME.MIN_LENGTH)
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Subscriber last name',
    example: 'Stark',
    minimum: SubscriberValidation.FIRST_NAME.MIN_LENGTH,
    maximum: SubscriberValidation.FIRST_NAME.MAX_LENGTH
  })
  @MaxLength(SubscriberValidation.FIRST_NAME.MAX_LENGTH)
  @MinLength(SubscriberValidation.FIRST_NAME.MIN_LENGTH)
  @IsString()
  lastName: string;
}
