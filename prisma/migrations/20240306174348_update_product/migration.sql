-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "is_gift_for_you" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_iconic_essential" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_new_arrivals" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_top_picks" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_trending" BOOLEAN NOT NULL DEFAULT false;
