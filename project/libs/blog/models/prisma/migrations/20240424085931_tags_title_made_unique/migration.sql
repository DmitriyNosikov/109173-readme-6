/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `posts_tags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "posts_tags_title_key" ON "posts_tags"("title");
