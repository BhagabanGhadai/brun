/*
  Warnings:

  - You are about to drop the column `colour` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "colour",
ADD COLUMN     "colours" JSONB[];
