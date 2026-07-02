/*
  Warnings:

  - Added the required column `isPublic` to the `Routes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Routes" ADD COLUMN     "isPublic" BOOLEAN NOT NULL,
ADD COLUMN     "statusId" INTEGER;

-- CreateTable
CREATE TABLE "RoutesImg" (
    "id" SERIAL NOT NULL,
    "img" TEXT NOT NULL,
    "routeId" INTEGER NOT NULL,

    CONSTRAINT "RoutesImg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoutStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RoutStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoutStatus_name_key" ON "RoutStatus"("name");

-- AddForeignKey
ALTER TABLE "Routes" ADD CONSTRAINT "Routes_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "RoutStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutesImg" ADD CONSTRAINT "RoutesImg_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Routes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
