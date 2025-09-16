/*
  Warnings:

  - You are about to drop the column `workoutExerciseId` on the `CoreCardioSet` table. All the data in the column will be lost.
  - You are about to drop the column `workoutExerciseId` on the `CoreStrengthSet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."CoreCardioSet" DROP CONSTRAINT "CoreCardioSet_workoutExerciseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CoreStrengthSet" DROP CONSTRAINT "CoreStrengthSet_workoutExerciseId_fkey";

-- DropIndex
DROP INDEX "public"."CoreCardioSet_workoutExerciseId_key";

-- DropIndex
DROP INDEX "public"."CoreStrengthSet_workoutExerciseId_key";

-- AlterTable
ALTER TABLE "public"."CoreCardioSet" DROP COLUMN "workoutExerciseId";

-- AlterTable
ALTER TABLE "public"."CoreStrengthSet" DROP COLUMN "workoutExerciseId";

-- AlterTable
ALTER TABLE "public"."WorkoutExercise" ADD COLUMN     "hasWarmup" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isBodyWeight" BOOLEAN NOT NULL DEFAULT false;
