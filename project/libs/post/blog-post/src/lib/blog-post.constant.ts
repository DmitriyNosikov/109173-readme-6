import { MessagesType, SortDirection, SortType } from '@project/shared/core';
import { postTypeList } from 'libs/shared/core/src/lib/types/post/post-type.enum';

export const MAX_POSTS_PER_PAGE = 25; // Максимальное количество постов при запросе списка
export const POST_ONLY_PUBLISHED = true; // В список публикаций попадают только посты со статусом 'Опубликовано' (isPublished)

export const MAX_SEARCH_POSTS_LIMIT = 20; // Максимальное количество возвращаемых публикаций при поиске
export const DEFAULT_SORT_TYPE = SortType.CREATED_AT;
export const DEFAULT_SORT_DIRECTION = SortDirection.DESC;
export const DEFAULT_PAGE_NUMBER = 1;

export const MAX_COMMENTS_PER_PAGE = 50; // Максимальное количество комментариев на один запрос

export const BlogPostValidation = {
  TITLE: {
    MIN_LENGTH: 20,
    MAX_LENGTH: 50
  },
  TAG: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 10,
    MAX_СOUNT: 8
  },
  ANNOUNCE: {
    MIN_LENGTH: 50,
    MAX_LENGTH: 255
  },
  TEXT: {
    MIN_LENGTH: 100,
    MAX_LENGTH: 1024
  },
  QUOTE_TEXT: {
    MIN_LENGTH: 20,
    MAX_LENGTH: 300
  },
  QUOTE_AUTHOR: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50
  },
  PHOTO: {
    SIZE: 1000, // 1 Мбайт
    EXT: ['jpg', 'png']
  },
  AVATAR: {
    SIZE: 500, // 500 Кб,
    EXT: ['jpg', 'png']
  },
  LINK_DESCRIPTION: {
    MAX_LENGTH: 300
  }
};

export const BlogPostMessage: MessagesType = {
  ERROR: {
    POST_TYPE: `Received invalid post type. Allowed types: ${postTypeList}`,
    CANT_UPDATE: 'Can`t update post. Possible reason: Object with fields to update are empty',
    UNAUTHORIZED: 'Post can be created only by authorized user',
    NOT_FOUND: 'Posts not found. Possible reason: Request is incorrect or Database is empty',
    NEW_NOT_FOUND: 'New posts not found. Possible reason: Nobody posts something new from latest notification',
    SEARCH_POSTS_LIMIT: `Search limit must not be greater than ${MAX_SEARCH_POSTS_LIMIT}`,
    GET_POSTS_LIMIT: `Get posts list limit must not be greater than ${MAX_POSTS_PER_PAGE}`,
  },
  SUCCESS: {
    FOUND: 'Posts found',
    CREATED: 'Post has been successfully created',
    UPDATED: 'Post has been successfully updated',
    DELETED: 'Post has been successfully deleted',
    NOTIFIED: 'Subscribers susccessfully notified'
  },
  DESCRIPTION: {
    LIST: `Show last ${MAX_POSTS_PER_PAGE} posts by passed query`,
    SEARCH: `Show last ${MAX_SEARCH_POSTS_LIMIT} posts by passed title`,
    DRAFTS: `Show current authorized user posts in 'Draft' state (not published)`,
    INDEX: 'Show all posts by passed query (global search without limitation)',
    SHOW: 'Get detail info about post by id',

    CREATE: 'Create new post',
    UPDATE: 'Update exists post by id',
    DELETE: 'Delete exists post by id',
    NOTIFY: 'Notify all subscribers about new posts',

    POST_ID: 'Post ID',
    POST_TITLE: 'Post title',
    POST_TAG: 'Post tag',
    POST_TAGS: 'Post tags',
    AUTHOR_ID: 'Correct MongoDB author id',
    IS_PUBLISHED: 'Flag allow search by Published (true) / Draft (false) posts',
    PUBLISHED_AT: 'Correct ISO Published At date string',

    // PAGINATION
    LIMIT: '[Pagination] Limit posts count for 1 page',
    DEFAULT_LIMIT: `Default limit: ${MAX_POSTS_PER_PAGE}`,

    PAGE: `[Pagination] Current page in pagination`,
    DEFAULT_PAGE: `Default page number: ${DEFAULT_PAGE_NUMBER}`,

    DEFAULT_POSTS_LIST_LIMIT: `Default posts count limit to get list: ${MAX_POSTS_PER_PAGE}`,
    DEFAULT_SEARCH_LIMIT: `Default posts count limit to search by title: ${MAX_SEARCH_POSTS_LIMIT}`,

    SORT_TYPE: `You can sort items by: ${SortType}`,
    DEFAULT_SORT_TYPE: `Default sort by field '${DEFAULT_SORT_TYPE}'`,

    SORT_DIRECTION: `Sort direction: ${SortDirection}`,
    DEFAULT_SORT_DIRECTION: `Default sort direction: ${DEFAULT_SORT_DIRECTION}`,
  }
} as const;
