/*
  Warnings:

  - You are about to drop the column `categoryName` on the `ProductCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[category_name]` on the table `ProductCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subcategory_id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_name` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ProductCategory_categoryName_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "is_featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "subcategory_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductCategory" DROP COLUMN "categoryName",
ADD COLUMN     "category_name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProductSubCategory" (
    "id" TEXT NOT NULL,
    "subcategory_name" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "ProductSubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductSubCategory_id_key" ON "ProductSubCategory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductSubCategory_subcategory_name_key" ON "ProductSubCategory"("subcategory_name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_category_name_key" ON "ProductCategory"("category_name");

-- AddForeignKey
ALTER TABLE "ProductSubCategory" ADD CONSTRAINT "ProductSubCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "ProductCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "ProductSubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
