import { Expose } from 'class-transformer';
import { PostWithTitleRDO } from './post-with-title.rdo';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoPostRDO implements PostWithTitleRDO {
  @Expose()
  @ApiProperty({
    description: 'Video post ID',
    example: '6dd03634-9785-49b8-a403-9ab61bb5656e'
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'Video title',
    example: 'Some video title'
  })
  public title: string;

  @Expose()

  @ApiProperty({
    description: 'Valid youtube video link',
    example: 'https://www.youtube.com/live/jfKfPfyJRdk?si=IsxOl50arZoSKcOI'
  })
  public videoURL: string;
}
