/*
  Warnings:

  - You are about to drop the column `total_value` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_time` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `razorpay_order_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `razorpay_payment_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `razorpay_signature` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Initiated', 'Accepted', 'Shipped', 'Deliverd', 'Cancelled', 'Returned');

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_user_id_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "total_value",
ADD COLUMN     "address_id" TEXT NOT NULL,
ADD COLUMN     "order_status" "OrderStatus" NOT NULL DEFAULT 'Initiated',
ADD COLUMN     "payment_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "products" JSONB[],
ADD COLUMN     "razorpay_order_id" TEXT NOT NULL,
ADD COLUMN     "razorpay_payment_id" TEXT NOT NULL,
ADD COLUMN     "razorpay_signature" TEXT NOT NULL,
ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Payment";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
