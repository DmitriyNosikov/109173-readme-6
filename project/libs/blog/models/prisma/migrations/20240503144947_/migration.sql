/*
  Warnings:

  - You are about to drop the column `comments_count` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `likes_count` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "comments_count",
DROP COLUMN "likes_count";
