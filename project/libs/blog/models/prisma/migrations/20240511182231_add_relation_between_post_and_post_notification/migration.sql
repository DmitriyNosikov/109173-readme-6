-- CreateTable
CREATE TABLE "_PostToPostNotification" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PostToPostNotification_AB_unique" ON "_PostToPostNotification"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToPostNotification_B_index" ON "_PostToPostNotification"("B");

-- AddForeignKey
ALTER TABLE "_PostToPostNotification" ADD CONSTRAINT "_PostToPostNotification_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToPostNotification" ADD CONSTRAINT "_PostToPostNotification_B_fkey" FOREIGN KEY ("B") REFERENCES "posts_notifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
