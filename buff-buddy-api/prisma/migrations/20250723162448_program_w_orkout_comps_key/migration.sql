/*
  Warnings:

  - You are about to drop the column `isActive` on the `ProgramWorkout` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[programId,workoutId]` on the table `ProgramWorkout` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProgramWorkout" DROP COLUMN "isActive";

-- CreateIndex
CREATE UNIQUE INDEX "ProgramWorkout_programId_workoutId_key" ON "ProgramWorkout"("programId", "workoutId");
