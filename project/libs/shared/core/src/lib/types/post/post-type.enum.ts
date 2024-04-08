export const PostType = {
  BASE: 'base',
  TEXT: 'text',
  LINK: 'link',
  QUOTE: 'quote',
  VIDEO: 'video',
  PHOTO: 'photo',
} as const;

export type PostTypeEnum = (typeof PostType)[keyof typeof PostType];
