-- DropForeignKey
ALTER TABLE "public"."Meal" DROP CONSTRAINT "Meal_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
