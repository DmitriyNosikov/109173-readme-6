import { ApiProperty } from '@nestjs/swagger'
import { PostWithTitleDTO } from './post-with-title.dto';

export class CreatePostVideoDTO implements PostWithTitleDTO {
  @ApiProperty({
    description: 'Video title',
    example: 'Some video title',
    minLength: 20,
    maxLength: 50,
    required: true
  })
  public title: string;

  @ApiProperty({
    description: 'Valid youtube video link',
    example: 'https://www.youtube.com/live/jfKfPfyJRdk?si=IsxOl50arZoSKcOI',
    minLength: 20,
    maxLength: 50,
    required: true
  })
  public videoURL: string;
}
