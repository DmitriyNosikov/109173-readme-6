import { ApiProperty } from '@nestjs/swagger';
import { UserInterface } from '@project/shared/core';
import { IsMongoId, IsString } from 'class-validator';

export class CreateLikeDTO {
  @ApiProperty({
    description: 'Like author id',
    example: '66224f68a3f9a165a1ab5fbd',
    required: true
  })
  @IsString()
  @IsMongoId()
  public authorId: UserInterface['id'];
}
