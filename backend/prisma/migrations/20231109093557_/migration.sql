-- CreateTable
CREATE TABLE "_ViewsToViewer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ViewsToViewer_AB_unique" ON "_ViewsToViewer"("A", "B");

-- CreateIndex
CREATE INDEX "_ViewsToViewer_B_index" ON "_ViewsToViewer"("B");

-- AddForeignKey
ALTER TABLE "_ViewsToViewer" ADD CONSTRAINT "_ViewsToViewer_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ViewsToViewer" ADD CONSTRAINT "_ViewsToViewer_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
