/*
  Warnings:

  - You are about to drop the column `fats` on the `FoodItem` table. All the data in the column will be lost.
  - You are about to drop the column `imgUrl` on the `FoodItem` table. All the data in the column will be lost.
  - You are about to drop the column `protein` on the `FoodItem` table. All the data in the column will be lost.
  - You are about to drop the column `sodium` on the `FoodItem` table. All the data in the column will be lost.
  - You are about to drop the column `sugar` on the `FoodItem` table. All the data in the column will be lost.
  - Made the column `barcode` on table `FoodItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."FoodItem" DROP COLUMN "fats",
DROP COLUMN "imgUrl",
DROP COLUMN "protein",
DROP COLUMN "sodium",
DROP COLUMN "sugar",
ADD COLUMN     "brandId" TEXT,
ADD COLUMN     "fat" DOUBLE PRECISION,
ADD COLUMN     "proteins" DOUBLE PRECISION,
ADD COLUMN     "salt" DOUBLE PRECISION,
ADD COLUMN     "saturatedFat" DOUBLE PRECISION,
ADD COLUMN     "servingSize" DOUBLE PRECISION,
ADD COLUMN     "sugars" DOUBLE PRECISION,
ALTER COLUMN "calories" DROP NOT NULL,
ALTER COLUMN "carbohydrates" DROP NOT NULL,
ALTER COLUMN "barcode" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."FoodItemLabel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodItemLabel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FoodItemImg" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "foodItemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodItemImg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FoodItemBrand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodItemBrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FoodItemCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodItemCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_FoodItemToFoodItemCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FoodItemToFoodItemCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_FoodItemToFoodItemLabel" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FoodItemToFoodItemLabel_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "FoodItemLabel_name_key" ON "public"."FoodItemLabel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FoodItemImg_foodItemId_key" ON "public"."FoodItemImg"("foodItemId");

-- CreateIndex
CREATE UNIQUE INDEX "FoodItemBrand_name_key" ON "public"."FoodItemBrand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FoodItemCategory_name_key" ON "public"."FoodItemCategory"("name");

-- CreateIndex
CREATE INDEX "_FoodItemToFoodItemCategory_B_index" ON "public"."_FoodItemToFoodItemCategory"("B");

-- CreateIndex
CREATE INDEX "_FoodItemToFoodItemLabel_B_index" ON "public"."_FoodItemToFoodItemLabel"("B");

-- AddForeignKey
ALTER TABLE "public"."FoodItem" ADD CONSTRAINT "FoodItem_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."FoodItemBrand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodItemImg" ADD CONSTRAINT "FoodItemImg_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "public"."FoodItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FoodItemToFoodItemCategory" ADD CONSTRAINT "_FoodItemToFoodItemCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."FoodItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FoodItemToFoodItemCategory" ADD CONSTRAINT "_FoodItemToFoodItemCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."FoodItemCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FoodItemToFoodItemLabel" ADD CONSTRAINT "_FoodItemToFoodItemLabel_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."FoodItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FoodItemToFoodItemLabel" ADD CONSTRAINT "_FoodItemToFoodItemLabel_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."FoodItemLabel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
