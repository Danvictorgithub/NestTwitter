/*
  Warnings:

  - You are about to drop the column `UserCover` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "UserCover",
ADD COLUMN     "userCover" TEXT NOT NULL DEFAULT '';
