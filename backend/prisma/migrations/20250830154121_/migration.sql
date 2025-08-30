/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `FoodItemImg` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."FoodItemImg_foodItemId_key";

-- CreateIndex
CREATE UNIQUE INDEX "FoodItemImg_url_key" ON "public"."FoodItemImg"("url");
