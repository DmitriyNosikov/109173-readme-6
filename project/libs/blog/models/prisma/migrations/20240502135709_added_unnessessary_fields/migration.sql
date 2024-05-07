-- AlterTable
ALTER TABLE "link_posts" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "is_repost" DROP NOT NULL,
ALTER COLUMN "origin_author_id" DROP NOT NULL,
ALTER COLUMN "origin_post_id" DROP NOT NULL,
ALTER COLUMN "published_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "posts_comments" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "posts_likes" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "posts_tags" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "posts_to_extra_fields" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;
