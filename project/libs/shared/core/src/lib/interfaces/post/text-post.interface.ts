import { PostWithTextInterface } from './post-with-text.interface';
import { PostWithTitleInterface } from './post-with-title.interface';

export interface TextPostInterface extends PostWithTitleInterface, PostWithTextInterface {
  id?: string;
  announce: string;
}
