-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_coupon_id_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "razorpay_payment_id" DROP NOT NULL,
ALTER COLUMN "razorpay_signature" DROP NOT NULL,
ALTER COLUMN "payment_time" DROP NOT NULL,
ALTER COLUMN "coupon_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
