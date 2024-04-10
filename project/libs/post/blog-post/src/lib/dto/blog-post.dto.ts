import { ApiProperty } from '@nestjs/swagger'
import { BasePostInterface, ExtraFields, PostType, PostTypeEnum, UserInterface } from '@project/shared/core';
import { PostLinkDTO } from './post-link.dto';
import { PostTextDTO } from './post-text.dto';
import { PostQuoteDTO } from './post-quote.dto';
import { PostPhotoDTO } from './post-photo.dto';
import { PostVideoDTO } from './post-video.dto';

export type ExtraFieldsDTO = BasePostDTO | PostLinkDTO | PostTextDTO | PostQuoteDTO | PostPhotoDTO | PostVideoDTO;

export class BasePostDTO {
  @ApiProperty({
    description: 'Post type',
    enum: PostType,
    example: 'text',
    required: true
  })
  public type: PostTypeEnum;

  @ApiProperty({
    type: [String],
    description: 'Post tags',
    example: '[ interesting, news, city]',
    minLength: 3,
    maxLength: 10,
    maxProperties: 8
  })
  public tags: string[];

  @ApiProperty({
    description: 'Post publish date in ISO String format',
    example: '2024-04-09T13:25:53+0000',
  })
  public publishedAt: string;

  @ApiProperty({
    description: 'Post created date in ISO String format',
    example: '2024-04-09T13:25:53+0000',
  })
  public createdAt: string;

  @ApiProperty({
    description: 'Is post published flag',
    example: 'true',
    default: false
  })
  public isPublished: boolean;

  @ApiProperty({
    description: 'Is repost flag',
    example: 'false',
    default: false
  })
  public isRepost: boolean;

  @ApiProperty({
    description: 'Post author id',
    example: '6dd03634-9785-49b8-a403-9ab61bb5656e',
    required: true
  })
  public authorId: UserInterface['id'];

  @ApiProperty({
    description: 'Original post author id (when reposted)',
    example: '6dd03634-9785-49b8-a403-9ab61bb5656e',
  })
  public originAuthorId: UserInterface['id'] | null;


  @ApiProperty({
    description: 'Original post id (when reposted)',
    example: '6dd03634-9785-49b8-a403-9ab61bb5656e',
  })
  public originPostId: BasePostInterface['id'] | null;

  @ApiProperty({
    description: 'Extra-fields, specific for each post type (text, link, quote etc.)',
    example: '{ "announce": "Some announce text", "title": "Article title", "text": "Long story short text" }'
  })
  public extraFields: ExtraFields;
}
