-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "comments_count" INTEGER DEFAULT 0,
ADD COLUMN     "likes_count" INTEGER DEFAULT 0;
