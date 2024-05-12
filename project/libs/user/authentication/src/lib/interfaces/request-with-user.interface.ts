import { BlogUserEntity } from '@project/user/blog-user';

export interface RequestWithUser {
  user?: BlogUserEntity;
}
