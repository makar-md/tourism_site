/*
  Warnings:

  - You are about to drop the column `routeId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Routes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_routeId_fkey";

-- AlterTable
ALTER TABLE "Routes" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "routeId";

-- AddForeignKey
ALTER TABLE "Routes" ADD CONSTRAINT "Routes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
