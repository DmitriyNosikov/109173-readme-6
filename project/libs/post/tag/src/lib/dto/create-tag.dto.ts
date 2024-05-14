import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength, IsNotEmpty, IsAlphanumeric, Matches } from 'class-validator';

const Validation = {
  NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 10,
    MAX_СOUNT: 8
  }
}

export class CreateTagDTO {
  @ApiProperty({
    type: [String],
    description: 'Tag name',
    example: 'tag1',
    minLength: Validation.NAME.MIN_LENGTH,
    maxLength: Validation.NAME.MAX_LENGTH,
  })
  @MinLength(Validation.NAME.MIN_LENGTH)
  @MaxLength(Validation.NAME.MAX_LENGTH)
  @IsString()
  @IsNotEmpty()
  @Matches(new RegExp('^[a-zA-Zа-яА-Я]', 'gmi'), { message: 'tag name must starts with letter'})
  @IsAlphanumeric('en-US')
  @IsString()
  name: string;
}
