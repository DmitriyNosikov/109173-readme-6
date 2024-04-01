import { PostWithTextInterface } from './post-with-text.interface';
import { PostInterface } from './post.interface';

export interface PostQuoteInterface extends PostInterface, PostWithTextInterface {
  authorId: string;
}
