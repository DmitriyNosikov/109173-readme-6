import { PostWithTitleInterface } from './post-with-title.interface';
import { PostInterface } from './post.interface';

export interface PostVideoInterface extends PostInterface, PostWithTitleInterface {
  videoURL: string;
}
