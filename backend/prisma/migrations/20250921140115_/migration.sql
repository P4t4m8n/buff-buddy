/*
  Warnings:

  - You are about to drop the column `level` on the `ProgramWorkout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."ProgramWorkout" DROP COLUMN "level",
ADD COLUMN     "workoutLevel" "public"."WorkoutLevel" NOT NULL DEFAULT 'beginner';
