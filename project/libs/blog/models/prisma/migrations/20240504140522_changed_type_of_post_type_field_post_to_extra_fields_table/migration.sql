/*
  Warnings:

  - Changed the type of `post_type` on the `posts_to_extra_fields` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "posts_to_extra_fields" DROP COLUMN "post_type",
ADD COLUMN     "post_type" "PostType" NOT NULL;
