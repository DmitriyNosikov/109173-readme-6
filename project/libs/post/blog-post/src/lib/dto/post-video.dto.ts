import { PostWithTitleDTO } from './post-with-title.dto';

export class PostVideoDTO implements PostWithTitleDTO {
  public title: string;
  public videoURL: string;
}
