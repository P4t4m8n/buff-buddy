/*
  Warnings:

  - You are about to drop the column `programExerciseId` on the `CoreSet` table. All the data in the column will be lost.
  - You are about to drop the column `programExerciseSuperSetId` on the `CoreSet` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `programId` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `workoutId` on the `WorkoutSet` table. All the data in the column will be lost.
  - You are about to drop the `ProgramExercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProgramExerciseSuperSet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExerciseToProgramExerciseSuperSet` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `WorkoutExerciseId` to the `WorkoutSet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CoreSet" DROP CONSTRAINT "CoreSet_programExerciseId_fkey";

-- DropForeignKey
ALTER TABLE "CoreSet" DROP CONSTRAINT "CoreSet_programExerciseSuperSetId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramExercise" DROP CONSTRAINT "ProgramExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramExercise" DROP CONSTRAINT "ProgramExercise_programId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramExerciseSuperSet" DROP CONSTRAINT "ProgramExerciseSuperSet_programId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_programId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutSet" DROP CONSTRAINT "WorkoutSet_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToProgramExerciseSuperSet" DROP CONSTRAINT "_ExerciseToProgramExerciseSuperSet_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToProgramExerciseSuperSet" DROP CONSTRAINT "_ExerciseToProgramExerciseSuperSet_B_fkey";

-- AlterTable
ALTER TABLE "CoreSet" DROP COLUMN "programExerciseId",
DROP COLUMN "programExerciseSuperSetId",
ADD COLUMN     "workoutExerciseId" TEXT,
ADD COLUMN     "workoutExerciseSuperSetId" TEXT;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "date",
DROP COLUMN "programId",
ADD COLUMN     "notes" TEXT;

-- AlterTable
ALTER TABLE "WorkoutSet" DROP COLUMN "workoutId",
ADD COLUMN     "WorkoutExerciseId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProgramExercise";

-- DropTable
DROP TABLE "ProgramExerciseSuperSet";

-- DropTable
DROP TABLE "_ExerciseToProgramExerciseSuperSet";

-- CreateTable
CREATE TABLE "ProgramWorkout" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "programId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "daysOfWeek" "DaysOfWeek"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutExercise" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "notes" TEXT,
    "exerciseId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutExerciseSuperSet" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "notes" TEXT,
    "workoutId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutExerciseSuperSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseToWorkoutExerciseSuperSet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ExerciseToWorkoutExerciseSuperSet_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ExerciseToWorkoutExerciseSuperSet_B_index" ON "_ExerciseToWorkoutExerciseSuperSet"("B");

-- AddForeignKey
ALTER TABLE "CoreSet" ADD CONSTRAINT "CoreSet_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "WorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoreSet" ADD CONSTRAINT "CoreSet_workoutExerciseSuperSetId_fkey" FOREIGN KEY ("workoutExerciseSuperSetId") REFERENCES "WorkoutExerciseSuperSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramWorkout" ADD CONSTRAINT "ProgramWorkout_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramWorkout" ADD CONSTRAINT "ProgramWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExerciseSuperSet" ADD CONSTRAINT "WorkoutExerciseSuperSet_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSet" ADD CONSTRAINT "WorkoutSet_WorkoutExerciseId_fkey" FOREIGN KEY ("WorkoutExerciseId") REFERENCES "WorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkoutExerciseSuperSet" ADD CONSTRAINT "_ExerciseToWorkoutExerciseSuperSet_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkoutExerciseSuperSet" ADD CONSTRAINT "_ExerciseToWorkoutExerciseSuperSet_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkoutExerciseSuperSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
