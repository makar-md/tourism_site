/*
  Warnings:

  - Added the required column `updated_at` to the `test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "test" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "num" DECIMAL(6,2),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
