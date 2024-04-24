import { ApiProperty } from '@nestjs/swagger'

export class CreatePostPhotoDTO {
  @ApiProperty({
    description: 'Photo URL',
    example: 'https://assets.htmlacademy.ru/previews/779/20230519_5c25a056-150.png',
    required: true
  })
  public photoURL: string;
}
