import { ApiProperty } from '@nestjs/swagger';
import { UserInterface } from '@project/shared/core';
import { IsMongoId, IsString } from 'class-validator';

export class CreateLikeDTO {
  @ApiProperty({
    description: 'Like author id',
    example: '6dd03634-9785-49b8-a403-9ab61bb5656e',
    required: true
  })
  @IsString()
  @IsMongoId()
  public authorId: UserInterface['id'];
}
