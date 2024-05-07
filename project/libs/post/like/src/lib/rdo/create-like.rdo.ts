import { ApiProperty } from '@nestjs/swagger';
import { BasePostInterface, UserInterface } from '@project/shared/core';
import { Expose } from 'class-transformer';

export class CreateLikeRDO {
  @Expose()
  @ApiProperty({
    description: 'Like id',
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6'
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'Like create date',
    example: '2024-05-06T13:40:46.649Z'
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'Like update date',
    example: '2024-05-06T13:40:46.649Z'
  })
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    description: 'Post id',
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6'
  })
  postId: BasePostInterface['id'];

  @Expose()
  @ApiProperty({
    description: 'Like author MongoDB id',
    example: '66224f68a3f9a165a1ab5fbd'
  })
  authorId: UserInterface['id'];

}
