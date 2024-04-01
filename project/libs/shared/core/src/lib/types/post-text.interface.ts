import { PostWithTextInterface } from './post-with-text.interface';
import { PostWithTitleInterface } from './post-with-title.interface';
import { PostInterface } from './post.interface';

export interface PostTextInterface extends PostInterface, PostWithTitleInterface, PostWithTextInterface {
  announce: string;
}
