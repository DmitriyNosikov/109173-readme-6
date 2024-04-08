import { PostWithTitleInterface } from './post-with-title.interface';

export interface PostVideoInterface extends PostWithTitleInterface {
  videoURL: string;
}
