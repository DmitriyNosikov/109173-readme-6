import { ApiProperty } from '@nestjs/swagger';
import { UserInterface } from '@project/shared/core';
import { IsMongoId, IsString } from 'class-validator';

export class CreateRepostDTO {
  @ApiProperty({
    description: 'Reposting post id',
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    required: true
  })
  @IsString()
  @IsMongoId()
  public postId: string;

  @ApiProperty({
    description: 'Repost author MongoDB id',
    example: '66224f68a3f9a165a1ab5fbd',
    required: true
  })
  @IsString()
  @IsMongoId()
  public authorId: UserInterface['id'];
}
