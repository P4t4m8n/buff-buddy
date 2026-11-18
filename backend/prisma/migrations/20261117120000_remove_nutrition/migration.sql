-- DropForeignKey
ALTER TABLE "FoodItem" DROP CONSTRAINT "FoodItem_brandId_fkey";

-- DropForeignKey
ALTER TABLE "FoodItemImg" DROP CONSTRAINT "FoodItemImg_foodItemId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_mealId_fkey";

-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "MealFoodItem" DROP CONSTRAINT "MealFoodItem_foodItemId_fkey";

-- DropForeignKey
ALTER TABLE "MealFoodItem" DROP CONSTRAINT "MealFoodItem_mealId_fkey";

-- DropForeignKey
ALTER TABLE "UserMeal" DROP CONSTRAINT "UserMeal_mealId_fkey";

-- DropForeignKey
ALTER TABLE "UserMeal" DROP CONSTRAINT "UserMeal_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "UserMealItem" DROP CONSTRAINT "UserMealItem_foodItemId_fkey";

-- DropForeignKey
ALTER TABLE "UserMealItem" DROP CONSTRAINT "UserMealItem_userMealId_fkey";

-- DropForeignKey
ALTER TABLE "_FoodItemToFoodItemCategory" DROP CONSTRAINT "_FoodItemToFoodItemCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_FoodItemToFoodItemCategory" DROP CONSTRAINT "_FoodItemToFoodItemCategory_B_fkey";

-- DropForeignKey
ALTER TABLE "_FoodItemToFoodItemLabel" DROP CONSTRAINT "_FoodItemToFoodItemLabel_A_fkey";

-- DropForeignKey
ALTER TABLE "_FoodItemToFoodItemLabel" DROP CONSTRAINT "_FoodItemToFoodItemLabel_B_fkey";

-- DropTable
DROP TABLE "FoodItem";

-- DropTable
DROP TABLE "FoodItemBrand";

-- DropTable
DROP TABLE "FoodItemCategory";

-- DropTable
DROP TABLE "FoodItemImg";

-- DropTable
DROP TABLE "FoodItemLabel";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Meal";

-- DropTable
DROP TABLE "MealFoodItem";

-- DropTable
DROP TABLE "UserMeal";

-- DropTable
DROP TABLE "UserMealItem";

-- DropTable
DROP TABLE "_FoodItemToFoodItemCategory";

-- DropTable
DROP TABLE "_FoodItemToFoodItemLabel";

-- DropEnum
DROP TYPE "MealType";
