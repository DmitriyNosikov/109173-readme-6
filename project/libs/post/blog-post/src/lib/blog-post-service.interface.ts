import { BlogPostEntity } from './blog-post.entity';
import { BlogPostTypesDTO } from './dto/blog-post.dto';
import { SortTypeEnum, SortDirectionEnum } from '@project/shared/core'
export interface BlogPostServiceInterface {
  create(dto: BlogPostTypesDTO): Promise<BlogPostEntity>;
  update(postId: string, updatedFields: Partial<BlogPostEntity>);
  delete(): Promise<BlogPostEntity>;

  show(postId: string): Promise<BlogPostEntity | null>;
  getList(): Promise<BlogPostEntity[] | null>;

  repost(postId: string, userId: string): Promise<BlogPostEntity>
  search(title: string): Promise<BlogPostEntity | null>;
  uploadImage(postId: string, data: unknown);
  sort(sortType: SortTypeEnum, sortDirection: SortDirectionEnum): Promise<BlogPostEntity>
}
