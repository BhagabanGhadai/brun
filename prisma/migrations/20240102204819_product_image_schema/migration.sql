/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Image` table. All the data in the column will be lost.
  - Added the required column `image_id` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "imageUrl",
ADD COLUMN     "image_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "slug" TEXT NOT NULL;
