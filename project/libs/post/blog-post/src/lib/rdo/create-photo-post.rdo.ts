import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreatePhotoPostRDO {
  @Expose()
  @ApiProperty({
    description: 'Photo post ID',
    example: '6dd03634-9785-49b8-a403-9ab61bb5656e'
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'Photo URL',
    example: 'https://assets.htmlacademy.ru/previews/779/20230519_5c25a056-150.png'
  })
  public photoURL: string;
}
