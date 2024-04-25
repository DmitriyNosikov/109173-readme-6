export { Entity } from "./lib/base/entity"

// INTERFACES
export { AuthUserInterface } from "./lib/interfaces/user/auth-user.interface"
export { UserInterface } from "./lib/interfaces/user/user.interface"

export { AllPostRelationInterface } from './lib/interfaces/post/all-post-relation.interface'

export { PostType, PostTypeEnum } from './lib/types/post/post-type.enum'
export { BasePostInterface } from './lib/interfaces/post/base-post.interface'
export { PostTextInterface } from './lib/interfaces/post/post-text.interface'
export { PostQuoteInterface } from './lib/interfaces/post/post-quote.interface'
export { PostLinkInterface } from './lib/interfaces/post/post-link.interface'
export { PostPhotoInterface } from './lib/interfaces/post/post-photo.interface'
export { PostVideoInterface } from './lib/interfaces/post/post-video.interface'

export { TagInterface } from './lib/interfaces/tag.interface'
export { CommentInterface } from './lib/interfaces/comment.interface'
export { LikeInterface } from './lib/interfaces/like.interface'
export { StorableEntity } from './lib/interfaces/storable-entity.interface'
export { EntityFactory } from './lib/interfaces/entity-factory.interface'

// TYPES
export { PlainObject } from './lib/types/plain-object.type'
export { MessagesType } from './lib/types/messages.type'

// SORT
export { SortType, SortDirection, SortTypeEnum, SortDirectionEnum } from './lib/types/post/sort-type.enum'

// CONSTANTS
export {
  MIN_PORT,
  MAX_PORT,
  Environment,
  ConfigEnvironment,
  EnvironmentType
} from './lib/constants/app.constant'
