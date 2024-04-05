import { BlogPostDTO } from './blog-post.dto';

export class PostLinkDTO extends BlogPostDTO {
  public linkURL: string;
  public description: string;
}
