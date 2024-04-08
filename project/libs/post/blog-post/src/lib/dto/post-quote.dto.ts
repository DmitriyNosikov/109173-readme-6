import { PostWithTextDTO } from './post-with-text.dto';

export class PostQuoteDTO implements PostWithTextDTO {
  public authorId: string;
  public text: string;

}
