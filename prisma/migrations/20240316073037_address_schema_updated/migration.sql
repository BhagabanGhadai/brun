/*
  Warnings:

  - The values [home,work,other] on the enum `AddressType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AddressType_new" AS ENUM ('shipping', 'billing');
ALTER TABLE "Address" ALTER COLUMN "address_type" DROP DEFAULT;
ALTER TABLE "Address" ALTER COLUMN "address_type" TYPE "AddressType_new" USING ("address_type"::text::"AddressType_new");
ALTER TYPE "AddressType" RENAME TO "AddressType_old";
ALTER TYPE "AddressType_new" RENAME TO "AddressType";
DROP TYPE "AddressType_old";
ALTER TABLE "Address" ALTER COLUMN "address_type" SET DEFAULT 'shipping';
COMMIT;

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "address_type" SET DEFAULT 'shipping';
