/*
  Warnings:

  - You are about to drop the column `title` on the `posts_tags` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `posts_tags` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `posts_tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "posts_tags_title_key";

-- AlterTable
ALTER TABLE "posts_tags" DROP COLUMN "title",
ADD COLUMN     "name" VARCHAR(10) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "posts_tags_name_key" ON "posts_tags"("name");
