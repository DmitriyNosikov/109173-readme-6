export const SortType = {
  POPULAR: 'popular', // по популярности (количетсву комментариев)
  CREATED_DATE: 'createdAt',
  LIKES_COUNT: 'likes-count',
  COMMENTS_COUNT: 'comments-count' // Возможно, не понадобится, т.к. непонятна сортировка по популярности
} as const;

export const SortDirection = {
  ASC: 'asc',
  DESC: 'desc'
} as const;

export type SortTypeEnum = (typeof SortType)[keyof typeof SortType];
export type SortDirectionEnum = (typeof SortDirection)[keyof typeof SortDirection];
