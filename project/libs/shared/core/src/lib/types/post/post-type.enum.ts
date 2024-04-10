export const PostType = {
  TEXT: 'text',
  LINK: 'link',
  QUOTE: 'quote',
  VIDEO: 'video',
  PHOTO: 'photo',
} as const;

export type PostTypeEnum = (typeof PostType)[keyof typeof PostType];
