export const PostType = {
  TEXT: 'text',
  QUOTE: 'quote',
  VIDEO: 'video',
  PHOTO: 'photo',
  LINK: 'link',
} as const;

export type PostTypeEnum = (typeof PostType)[keyof typeof PostType];
