import { PrismaClient } from '@prisma/client'
import { getBasePosts, getLinkPosts, getPostsComments, getPostsLikes, getPostsRelations, getTextPosts, getVideoPosts } from './mock-data';

async function seedDB(prismaClient: PrismaClient) {
  // BASE POSTS
  const mockBasePosts = getBasePosts();
  for(const basePost of mockBasePosts) {
    await prismaClient.post.upsert({
      where: { id: basePost.id }, // Если находим пост с таким id - ничего не делаем
      update: {}, // Ничего не обновляем
      create: {
        id: basePost.id,
        type: basePost.type,
        // ---> TODO: Поправить, почему-то не работает
        // tags: basePost.tags ? {
        //   create: basePost.tags
        // }: undefined,
        // comments: basePost.comments ? {
        //   create: basePost.comments
        // }: undefined,
        // likes: basePost.likes ? {
        //   create: basePost.likes
        // }: undefined,
        isPublished: basePost.isPublished,
        isRepost: basePost.isRepost,
        authorId: basePost.authorId,
        originAuthorId: basePost.originAuthorId,
        originPostId: basePost.originPostId,
      }
    });
  }

  // LIKES
  const mockPostsLikes = getPostsLikes()
  for(const postsLike of mockPostsLikes) {
    await prismaClient.postLike.upsert({
      where: { id: postsLike.id },
      update: {},
      create: {
        id: postsLike.id,
        postId: postsLike.postId,
        authorId: postsLike.authorId
      }
    });
  }

  // COMMENTS
  const mockPostsComments = getPostsComments()
  for(const postsComment of mockPostsComments) {
    await prismaClient.postComment.upsert({
      where: { id: postsComment.id },
      update: {},
      create: {
        id: postsComment.id,
        postId: postsComment.postId,
        authorId: postsComment.authorId,
        text: postsComment.text
      }
    });
  }

  // TEXT POSTS
  const mockTextPosts = getTextPosts();
  for(const textPost of mockTextPosts) {
    await prismaClient.textPost.upsert({
      where: { id: textPost.id },
      update: {},
      create: {
        id: textPost.id,
        announce: textPost.announce,
        title: textPost.title,
        text: textPost.text
      }
    });
  }

  // LINK POSTS
  const mockLinkPosts = getLinkPosts();
  for(const linkPost of mockLinkPosts) {
    await prismaClient.linkPost.upsert({
      where: { id: linkPost.id },
      update: {},
      create: {
        id: linkPost.id,
        linkURL: linkPost.linkURL,
        description: linkPost.description
      }
    });
  }

  // VIDEO POSTS
  const mockVideoPosts = getVideoPosts();
  for(const videoPost of mockVideoPosts) {
    await prismaClient.videoPost.upsert({
      where: { id: videoPost.id },
      update: {},
      create: {
        id: videoPost.id,
        title: videoPost.title,
        videoURL: videoPost.videoURL
      }
    });
  }

  // POSTS RELATIONS
  const mockPostsRelations = getPostsRelations();
  for(const relation of mockPostsRelations) {
    await prismaClient.postRelation.upsert({
      where: { id: relation.id },
      update: {},
      create: {
        id: relation.id,
        postId: relation.postId,
        postType: relation.PostType,
        extraFieldsId: relation.extraFieldsId
      }
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDB(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
