import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreatePhotoPostDTO {
  @ApiProperty({
    description: 'Photo URL',
    example: 'https://assets.htmlacademy.ru/previews/779/20230519_5c25a056-150.png',
    required: true
  })
  @IsUrl()
  @IsNotEmpty()
  public photoURL: string;
}
