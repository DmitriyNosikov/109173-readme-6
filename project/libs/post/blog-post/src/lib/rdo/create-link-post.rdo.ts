import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateLinkPostRDO {
  @Expose()
  @ApiProperty({
    description: 'Link post ID',
    example: '6dd03634-9785-49b8-a403-9ab61bb5656e',
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'Valid link URL',
    example: 'https://up.htmlacademy.ru/profession/fullstack/6/nodejs-2/6/project/readme'
  })
  public linkURL: string;

  @Expose()
  @ApiProperty({
    description: 'Link description',
    example: 'Site to check your internet connection speed'
  })
  public description: string;
}
