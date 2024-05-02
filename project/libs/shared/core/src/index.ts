export { Entity } from "./lib/base/entity"

// INTERFACES
export { AuthUserInterface } from "./lib/interfaces/user/auth-user.interface"
export { UserInterface } from "./lib/interfaces/user/user.interface"

export { PostToExtraFieldsInterface } from './lib/interfaces/post/post-to-extra-fields.interface'

export { PostType, PostTypeEnum } from './lib/types/post/post-type.enum'
export { BasePostInterface } from './lib/interfaces/post/base-post.interface'
export { TextPostInterface } from './lib/interfaces/post/text-post.interface'
export { QuotePostInterface } from './lib/interfaces/post/quote-post.interface'
export { LinkPostInterface } from './lib/interfaces/post/link-post.interface'
export { PhotoPostInterface } from './lib/interfaces/post/photo-post.interface'
export { VideoPostInterface } from './lib/interfaces/post/video-post.interface'

export { TagInterface } from './lib/interfaces/tag.interface'
export { CommentInterface } from './lib/interfaces/comment.interface'
export { LikeInterface } from './lib/interfaces/like.interface'
export { StorableEntity } from './lib/interfaces/storable-entity.interface'
export { EntityFactory } from './lib/interfaces/entity-factory.interface'

// TYPES
export { PlainObject } from './lib/types/plain-object.type'
export { MessagesType } from './lib/types/messages.type'
export { PaginationResult } from './lib/types/pagination-result'

// SORT
export { SortType, SortDirection, SortTypeEnum, SortDirectionEnum } from './lib/types/sort-type.enum'

// CONSTANTS
export {
  MIN_PORT,
  MAX_PORT,
  Environment,
  ConfigEnvironment,
  EnvironmentType
} from './lib/constants/app.constant'
