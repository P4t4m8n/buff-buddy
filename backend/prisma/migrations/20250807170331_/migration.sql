/*
  Warnings:

  - You are about to drop the column `calorieTarget` on the `UserCardioSet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."UserCardioSet" DROP COLUMN "calorieTarget",
ADD COLUMN     "caloriesBurned" INTEGER;
