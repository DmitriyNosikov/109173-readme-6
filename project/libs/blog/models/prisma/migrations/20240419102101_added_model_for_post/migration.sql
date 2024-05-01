-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('text', 'link', 'quote', 'video', 'photo');

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "type" "PostType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_published" BOOLEAN NOT NULL,
    "is_repost" BOOLEAN NOT NULL,
    "author_id" TEXT NOT NULL,
    "origin_author_id" TEXT NOT NULL,
    "origin_post_id" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_relations" (
    "id" TEXT NOT NULL,
    "post_id" VARCHAR(255) NOT NULL,
    "post_type" TEXT NOT NULL,
    "extra_fields_id" TEXT NOT NULL,

    CONSTRAINT "posts_relations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextPost" (
    "id" TEXT NOT NULL,
    "announce" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "TextPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkPost" (
    "id" TEXT NOT NULL,
    "link_url" TEXT NOT NULL,
    "description" VARCHAR(300) NOT NULL,

    CONSTRAINT "LinkPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuotePost" (
    "id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "text" VARCHAR(300) NOT NULL,

    CONSTRAINT "QuotePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoPost" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "video_url" TEXT NOT NULL,

    CONSTRAINT "VideoPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhotoPost" (
    "id" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,

    CONSTRAINT "PhotoPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(10) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "text" VARCHAR(300) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_relations_post_id_key" ON "posts_relations"("post_id");

-- CreateIndex
CREATE INDEX "TextPost_title_idx" ON "TextPost"("title");

-- CreateIndex
CREATE INDEX "VideoPost_title_idx" ON "VideoPost"("title");

-- CreateIndex
CREATE UNIQUE INDEX "comments_postId_key" ON "comments"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "likes_postId_key" ON "likes"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTag_AB_unique" ON "_PostToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

-- AddForeignKey
ALTER TABLE "posts_relations" ADD CONSTRAINT "posts_relations_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
