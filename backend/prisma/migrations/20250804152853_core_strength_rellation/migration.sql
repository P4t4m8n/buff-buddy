/*
  Warnings:

  - A unique constraint covering the columns `[coreStrengthSetId]` on the table `WorkoutExercise` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WorkoutExercise_coreStrengthSetId_key" ON "public"."WorkoutExercise"("coreStrengthSetId");
