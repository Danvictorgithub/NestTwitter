-- CreateTable
CREATE TABLE "_LikesToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LikesToPost_AB_unique" ON "_LikesToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_LikesToPost_B_index" ON "_LikesToPost"("B");

-- AddForeignKey
ALTER TABLE "_LikesToPost" ADD CONSTRAINT "_LikesToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikesToPost" ADD CONSTRAINT "_LikesToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
