-- CreateTable
CREATE TABLE "posts_notifications" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "posts_notifications_pkey" PRIMARY KEY ("id")
);
