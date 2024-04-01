import { PostInterface } from './post.interface';

export interface PostLinkInterface extends PostInterface {
  linkURL: string;
  description: string;
}
