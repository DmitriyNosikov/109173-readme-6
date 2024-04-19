const PostType = {
  TEXT: 'text',
  LINK: 'link',
  QUOTE: 'quote',
  VIDEO: 'video',
  PHOTO: 'photo',
} as const;

// USERS
export const FIRST_USER_UUID = "662253e794534cbee6562f7d";
export const SECOND_USER_UUID = "66224f68a3f9a165a1ab5fbd";

// POSTS
export const FIRST_POST_UUID = "25a05639-5a27-41bc-b28a-894f8b5babd5";
export const SECOND_POST_UUID = "abdb5908-7ac4-467e-ab2a-76d11a5feeaf";
export const THIRD_POST_UUID = "f46b35fc-ab5c-4ef0-a2cc-90187a3aff4a";
export const FORTH_POST_UUID = "f62fb0df-e7c4-4504-8c63-fdae1fe5bf05";

// LIKES
export const FIRST_LIKE_ID = "bed06009-27a2-464c-ab3e-f1850a5a89c1";
export const SECOND_LIKE_ID = "d1eeb6aa-e6c8-4dda-822d-1e0aa7eed563";

// COMMENTS
export const FIRST_COMMENT_ID = "c530dc6d-9d12-4e05-859a-9ef8c72429f7";

// TAGS
export const FIRST_TAG_ID = "7f512d85-97c3-42fb-94f8-a7075dd15801"
export const SECOND_TAG_ID = "20fcee45-6b39-419c-8435-77eb67a1e2e6"

// POSTS RELATIONS
export const FIRST_RELATION_UUID = "b984138c-3de6-46b5-88de-f5fb7e42c82f";
export const SECOND_RELATION_UUID = "a88396c4-a073-4f62-a4b7-898c50695c4e";
export const THIRD_RELATION_UUID = "c60e8889-5511-46c4-81f7-2abfeb7c3912";
export const FORTH_RELATION_UUID = "7cfcd323-282b-4d88-9750-feb37154ffc3";

// EXTRA FIELDS
export const FIRST_TEXT_POST_UUID = "5f57a19c-696f-461a-a4db-102c104c7965";
export const FIRST_LINK_POST_UUID = "eb4434cd-a05c-46ba-ba5f-20f1467f6847";
export const SECOND_LINK_POST_UUID = "fb90e7b1-f5af-46e2-9168-a3a95854654e";
export const FIRST_VIDEO_POST_UUID = "4b4af6a4-7c33-46b9-94b8-6dfc4a6e7e04";

export function getBasePosts() {
  return [
    {
      id: FIRST_POST_UUID,
      type: PostType.TEXT,
      tags: {
        connect: [
          { id: FIRST_TAG_ID },
          { id: SECOND_TAG_ID },
        ]
      },
      likes: {
        connect: [{ id: FIRST_LIKE_ID }]
      },
      isPublished: "true",
      isRepost: "false",
      authorId: FIRST_USER_UUID,
      originAuthorId: "",
      originPostId: "",
    },
    {
      id: SECOND_POST_UUID,
      type: PostType.LINK,
      comments: {
        connect: [{ id: FIRST_COMMENT_ID }]
      },
      likes: {
        connect: [{ id: SECOND_LIKE_ID }]
      },
      isPublished: "true",
      isRepost: "false",
      authorId: FIRST_USER_UUID,
      originAuthorId: "",
      originPostId: "",
    },
    {
      id: THIRD_POST_UUID,
      type: PostType.LINK,
      isPublished: "true",
      isRepost: "false",
      authorId: SECOND_USER_UUID,
      originAuthorId: "",
      originPostId: "",
    },
    {
      id: FORTH_POST_UUID,
      type: PostType.LINK,
      isPublished: "false",
      isRepost: "false",
      authorId: SECOND_USER_UUID,
      originAuthorId: "",
      originPostId: "",
    }
  ];
}

export function getTextPosts() {
  return [
    {
      id: FIRST_TEXT_POST_UUID,
      announce: 'Some text announce',
      title: 'Interesting Text headline (title)',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec bibendum lectus, a sagittis orci.'
    }
  ];
}

export function getLinkPosts() {
  return [
    {
      id: FIRST_LINK_POST_UUID,
      linkURL: "https://www.uuidgenerator.net/",
      description: "UUID generator site"
    },
    {
      id: SECOND_LINK_POST_UUID,
      linkURL: "https://ru.lipsum.com/feed/html",
      description: "Lorem ipsum generator site"
    },
  ];
}

export function getVideoPosts() {
  return [
    {
      id: FIRST_VIDEO_POST_UUID,
      title: 'Lo-fi/Chillout music video',
      videoURL: "https://www.youtube.com/watch?v=jfKfPfyJRdk"
    }
  ];
}

export function getPostsRelations() {
  return [
    {
      id: FIRST_RELATION_UUID,
      postId: FIRST_POST_UUID,
      PostType: PostType.TEXT,
      extraFieldsId: FIRST_TEXT_POST_UUID
    },
    {
      id: SECOND_RELATION_UUID,
      postId: SECOND_POST_UUID,
      PostType: PostType.LINK,
      extraFieldsId: FIRST_LINK_POST_UUID
    },
    {
      id: THIRD_RELATION_UUID,
      postId: THIRD_POST_UUID,
      PostType: PostType.LINK,
      extraFieldsId: SECOND_LINK_POST_UUID
    },
    {
      id: FORTH_RELATION_UUID,
      postId: FORTH_POST_UUID,
      PostType: PostType.VIDEO,
      extraFieldsId: FIRST_VIDEO_POST_UUID
    },
  ];
}

export function getTags() {
  return [
    {
      id: FIRST_TAG_ID,
      posts: {
        connect: [{ id: FIRST_POST_UUID }]
      },
      title: "News"
    },
    {
      id: SECOND_TAG_ID,
      posts: {
        connect: [{ id: FIRST_POST_UUID }]
      },
      title: "HOT"
    }
  ];
}

// TODO: Непонятно, как правильно описать в моках
// связи лайков, комментов и постов. Надо узнать и переписать
// правильно
export function getPostsComments() {
  return [
    {
      id: FIRST_COMMENT_ID,
      postId: SECOND_POST_UUID,
      authorId: FIRST_USER_UUID,
      text: "Some interesting comment for current post ... Five stars!"
    }
  ];
}

export function getPostsLikes() {
  return [
    {
      id: FIRST_LIKE_ID,
      postId: FIRST_POST_UUID,
      authorId: SECOND_USER_UUID
    },
    {
      id: SECOND_LIKE_ID,
      postId: SECOND_POST_UUID,
      authorId: FIRST_USER_UUID
    }
  ];
}
