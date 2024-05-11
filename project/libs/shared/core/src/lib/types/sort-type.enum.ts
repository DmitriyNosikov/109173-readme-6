export const SortType = {
  CREATED_AT: 'createdAt',
  PUBLISHED_AT: 'publishedAt',
  LIKES: 'likes',
  COMMENTS: 'comments'
} as const;

export const SortDirection = {
  ASC: 'asc',
  DESC: 'desc'
} as const;

export type SortTypeEnum = (typeof SortType)[keyof typeof SortType];
export type SortDirectionEnum = (typeof SortDirection)[keyof typeof SortDirection];
