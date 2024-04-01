export interface PostInterface {
  id: string;
  tags: string[];
  publishedAt: string;
  createdAt: string;
  isPublished: boolean;
  authorId: string;
  originAuthorId: string | null;
  originPostId: string | null;
  isRepost: boolean;
}
