export const SortType = {
  CREATED_AT: 'createdAt',
  LIKES: 'likes',
  COMMENTS: 'comments' // Возможно, не понадобится, т.к. непонятна сортировка по популярности
} as const;

export const SortDirection = {
  ASC: 'asc',
  DESC: 'desc'
} as const;

export type SortTypeEnum = (typeof SortType)[keyof typeof SortType];
export type SortDirectionEnum = (typeof SortDirection)[keyof typeof SortDirection];
