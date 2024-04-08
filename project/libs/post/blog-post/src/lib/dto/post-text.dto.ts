import { PostWithTextDTO } from './post-with-text.dto';
import { PostWithTitleDTO } from './post-with-title.dto';

export class PostTextDTO implements PostWithTitleDTO, PostWithTextDTO {
  public title: string;
  public announce: string;
  public text: string;
}
