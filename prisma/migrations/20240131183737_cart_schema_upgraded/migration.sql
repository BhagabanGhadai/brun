/*
  Warnings:

  - You are about to drop the column `produt_id` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_produt_id_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "produt_id",
ADD COLUMN     "product_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
