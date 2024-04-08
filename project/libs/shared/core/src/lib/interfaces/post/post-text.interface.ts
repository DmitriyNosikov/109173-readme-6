import { PostWithTextInterface } from './post-with-text.interface';
import { PostWithTitleInterface } from './post-with-title.interface';

export interface PostTextInterface extends PostWithTitleInterface, PostWithTextInterface {
  announce: string;
}
