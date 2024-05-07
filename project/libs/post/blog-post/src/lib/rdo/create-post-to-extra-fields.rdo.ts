import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@prisma/client';
import { BasePostInterface, PostTypeEnum } from '@project/shared/core';
import { Expose } from 'class-transformer';

export class CreatePostToExtraFieldsRDO {
  @Expose()
  @ApiProperty({
    description: 'Post to extra fields relation ID',
    example: '6dd03634-9785-49b8-a403-9ab61bb5656e',
  })
  public id?: string;

  @Expose()
  @ApiProperty({
    description: 'Relation create date',
    example: '2024-05-06T13:40:46.649Z'
  })
  createdAt?: Date;

  @Expose()
  @ApiProperty({
    description: 'Relation update date',
    example: '2024-05-06T13:40:46.649Z'
  })
  updatedAt?: Date;

  @Expose()
  @ApiProperty({
    description: 'Base post ID',
    example: '6dd03634-9785-49b8-a403-9ab61bb5656e',
  })
  public postId: BasePostInterface['id'];

  @Expose()
  @ApiProperty({
    description: 'Base post type',
    enum: PostType,
    example: 'text'

  })
  public postType: PostTypeEnum;

  @Expose()
  @ApiProperty({
    description: 'Extra fields ID',
    example: '6dd03634-9785-49b8-a403-9ab61bb5656e'
  })
  public extraFieldsId: string;
}
