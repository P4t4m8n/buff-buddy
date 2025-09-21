/*
  Warnings:

  - The `level` column on the `ProgramWorkout` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `workoutGoal` column on the `ProgramWorkout` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."WorkoutGoal" AS ENUM ('hypertrophy');

-- CreateEnum
CREATE TYPE "public"."WorkoutLevel" AS ENUM ('beginner');

-- AlterTable
ALTER TABLE "public"."ProgramWorkout" DROP COLUMN "level",
ADD COLUMN     "level" "public"."WorkoutLevel" NOT NULL DEFAULT 'beginner',
DROP COLUMN "workoutGoal",
ADD COLUMN     "workoutGoal" "public"."WorkoutGoal" NOT NULL DEFAULT 'hypertrophy';
