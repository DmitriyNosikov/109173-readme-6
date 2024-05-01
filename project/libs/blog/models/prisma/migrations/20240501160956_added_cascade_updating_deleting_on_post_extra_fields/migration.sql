-- DropForeignKey
ALTER TABLE "posts_to_extra_fields" DROP CONSTRAINT "posts_to_extra_fields_post_id_fkey";

-- AddForeignKey
ALTER TABLE "posts_to_extra_fields" ADD CONSTRAINT "posts_to_extra_fields_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
