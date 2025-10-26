-- DropForeignKey
ALTER TABLE "public"."UserMeal" DROP CONSTRAINT "UserMeal_mealId_fkey";

-- CreateTable
CREATE TABLE "UserMealItem" (
    "id" TEXT NOT NULL,
    "userMealId" TEXT NOT NULL,
    "foodItemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMealItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserMeal" ADD CONSTRAINT "UserMeal_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMealItem" ADD CONSTRAINT "UserMealItem_userMealId_fkey" FOREIGN KEY ("userMealId") REFERENCES "UserMeal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMealItem" ADD CONSTRAINT "UserMealItem_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "FoodItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
