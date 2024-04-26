import { PostWithTitleInterface } from './post-with-title.interface';

export interface VideoPostInterface extends PostWithTitleInterface {
  id?: string;
  videoURL: string;
}
