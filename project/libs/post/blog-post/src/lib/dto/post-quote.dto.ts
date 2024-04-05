import { BlogPostDTO } from './blog-post.dto';
import { PostWithTextDTO } from './post-with-text.dto';

export class PostQuoteDTO extends BlogPostDTO implements PostWithTextDTO {
  public authorId: string;
  public text: string;

}
