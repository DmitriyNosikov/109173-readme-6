import { BlogPostDTO } from './blog-post.dto';
import { PostWithTextDTO } from './post-with-text.dto';
import { PostWithTitleDTO } from './post-with-title.dto';

export class PostTextDTO extends BlogPostDTO implements PostWithTitleDTO, PostWithTextDTO {
  public title: string;
  public announce: string;
  public text: string;
}
