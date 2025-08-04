/*
  Warnings:

  - A unique constraint covering the columns `[coreCardioSetId]` on the table `WorkoutExercise` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WorkoutExercise_coreCardioSetId_key" ON "public"."WorkoutExercise"("coreCardioSetId");
