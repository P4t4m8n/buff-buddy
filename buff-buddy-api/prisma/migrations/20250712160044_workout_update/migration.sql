/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `programExerciseId` on the `Workout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_exerciseId_fkey";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "exerciseId",
DROP COLUMN "programExerciseId";
