import { ApiProperty } from '@nestjs/swagger'
import { BasePostInterface, LikeInterface, PostType, PostTypeEnum, UserInterface } from '@project/shared/core';
import { CreatePostLinkDTO } from './create-post-link.dto';
import { CreatePostTextDTO } from './create-post-text.dto';
import { CreatePostQuoteDTO } from './create-post-quote.dto';
import { CreatePostPhotoDTO } from './create-post-photo.dto';
import { CreatePostVideoDTO } from './create-post-video.dto';
import { CommentInterface } from '@project/shared/core'

export type ExtraFieldsDTO = CreateBasePostDTO | CreatePostLinkDTO | CreatePostTextDTO | CreatePostQuoteDTO | CreatePostPhotoDTO | CreatePostVideoDTO;

export class CreateBasePostDTO {
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
    example: '[ "438734-gdjf9g843-gsmi43", "438734-gdjf9g843-gsmi43" ]',
    minLength: 3,
    maxLength: 10,
    maxProperties: 8
  })
  public tags: string[] | null;

  @ApiProperty({
    type: [String],
    description: 'Post comments',
    example: '[ { id: "438734-gdjf9g843-gsmi43", authorId: "gh8394g8h9efgh39434g", text: "Some comment text" } ]',
    minLength: 3,
    maxLength: 10,
    maxProperties: 8
  })
  public comments: CommentInterface[] | null;

  @ApiProperty({
    type: [String],
    description: 'Post tags',
    example: '[ { id: "438734-gdjf9g843-gsmi43", authorId: "gh8394g8h9efgh39434g" } ]',
    minLength: 3,
    maxLength: 10,
    maxProperties: 8
  })
  public likes: LikeInterface[] | null;

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
  public extraFields: ExtraFieldsDTO;
}
