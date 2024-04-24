import { ApiProperty } from '@nestjs/swagger'
export class CreatePostLinkDTO {
  @ApiProperty({
    description: 'Valid link URL',
    example: 'https://up.htmlacademy.ru/profession/fullstack/6/nodejs-2/6/project/readme',
    required: true
  })
  public linkURL: string;

  @ApiProperty({
    description: 'Link description',
    example: '6dd03634-9785-49b8-a403-9ab61bb5656e',
    maxLength: 300
  })
  public description: string;
}
