import { BasePostEntity } from './entities/base-post.entity';
import { ExtraFieldsDTO } from './dto/create-blog-post.dto';
import { SortTypeEnum, SortDirectionEnum } from '@project/shared/core'
export interface BlogPostServiceInterface {
  create(dto: ExtraFieldsDTO): Promise<BasePostEntity>;
  update(postId: string, updatedFields: Partial<BasePostEntity>);
  delete(): Promise<BasePostEntity>;

  show(postId: string): Promise<BasePostEntity | null>;
  getList(): Promise<BasePostEntity[] | null>;

  repost(postId: string, userId: string): Promise<BasePostEntity>
  search(title: string): Promise<BasePostEntity | null>;
  uploadImage(postId: string, data: unknown);
  sort(sortType: SortTypeEnum, sortDirection: SortDirectionEnum): Promise<BasePostEntity>
}
