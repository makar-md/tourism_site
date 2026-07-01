/*
  Warnings:

  - Made the column `routeId` on table `Point` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_routeId_fkey";

-- AlterTable
ALTER TABLE "Point" ALTER COLUMN "routeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "routeId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Routes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Routes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
