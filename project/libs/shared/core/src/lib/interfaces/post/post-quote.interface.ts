import { PostWithTextInterface } from './post-with-text.interface';
export interface PostQuoteInterface extends PostWithTextInterface {
  id?: string;
  authorId: string;
}
