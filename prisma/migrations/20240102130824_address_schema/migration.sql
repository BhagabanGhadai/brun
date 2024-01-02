/*
  Warnings:

  - You are about to drop the column `address` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `address1` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "address",
ADD COLUMN     "address1" TEXT NOT NULL,
ADD COLUMN     "address2" TEXT;