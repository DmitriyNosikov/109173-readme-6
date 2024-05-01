import { PostWithTextInterface } from './post-with-text.interface';
export interface QuotePostInterface extends PostWithTextInterface {
  id?: string;
  authorId: string;
}
