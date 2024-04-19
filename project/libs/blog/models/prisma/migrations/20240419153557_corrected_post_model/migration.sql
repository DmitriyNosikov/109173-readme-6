/*
  Warnings:

  - You are about to drop the `LinkPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PhotoPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuotePost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TextPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VideoPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "LinkPost";

-- DropTable
DROP TABLE "PhotoPost";

-- DropTable
DROP TABLE "QuotePost";

-- DropTable
DROP TABLE "TextPost";

-- DropTable
DROP TABLE "VideoPost";

-- CreateTable
CREATE TABLE "text_posts" (
    "id" TEXT NOT NULL,
    "announce" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "text_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "link_posts" (
    "id" TEXT NOT NULL,
    "link_url" TEXT NOT NULL,
    "description" VARCHAR(300) NOT NULL,

    CONSTRAINT "link_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_posts" (
    "id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "text" VARCHAR(300) NOT NULL,

    CONSTRAINT "quote_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_posts" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "video_url" TEXT NOT NULL,

    CONSTRAINT "video_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo_posts" (
    "id" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,

    CONSTRAINT "photo_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "text_posts_title_idx" ON "text_posts"("title");

-- CreateIndex
CREATE INDEX "video_posts_title_idx" ON "video_posts"("title");
