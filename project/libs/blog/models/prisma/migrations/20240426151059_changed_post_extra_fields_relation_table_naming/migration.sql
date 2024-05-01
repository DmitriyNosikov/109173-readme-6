/*
  Warnings:

  - You are about to drop the `posts_relations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "posts_relations" DROP CONSTRAINT "posts_relations_post_id_fkey";

-- DropTable
DROP TABLE "posts_relations";

-- CreateTable
CREATE TABLE "posts_to_extra_fields" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "post_id" VARCHAR(255) NOT NULL,
    "post_type" TEXT NOT NULL,
    "extra_fields_id" TEXT NOT NULL,

    CONSTRAINT "posts_to_extra_fields_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_to_extra_fields_post_id_key" ON "posts_to_extra_fields"("post_id");

-- AddForeignKey
ALTER TABLE "posts_to_extra_fields" ADD CONSTRAINT "posts_to_extra_fields_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
