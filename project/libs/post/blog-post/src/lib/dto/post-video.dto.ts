import { BlogPostDTO } from './blog-post.dto';
import { PostWithTitleDTO } from './post-with-title.dto';

export class PostVideoDTO extends BlogPostDTO implements PostWithTitleDTO {
  public title: string;
  public videoURL: string;
}
