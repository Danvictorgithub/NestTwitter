-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_commentId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "commentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
