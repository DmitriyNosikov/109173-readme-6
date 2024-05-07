import { ApiProperty } from '@nestjs/swagger';
import { UserInterface } from '@project/shared/core';
import { Expose } from 'class-transformer';

export class CreateCommentRDO {
  @Expose()
  @ApiProperty({
    description: 'Comment id',
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6'
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'Comment create date',
    example: '2024-05-06T13:40:46.649Z'
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'Comment update date',
    example: '2024-05-06T13:40:46.649Z'
  })
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    description: 'Comment author MongoDB id',
    example: '66224f68a3f9a165a1ab5fbd'
  })
  authorId: UserInterface['id'];

  @Expose()
  @ApiProperty({
    description: 'Comment text',
    example: 'Interesting place for rest... 5 stars!'
  })
  text: string;
}
