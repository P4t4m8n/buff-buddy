/*
  Warnings:

  - You are about to drop the column `coreSetId` on the `UserSet` table. All the data in the column will be lost.
  - Added the required column `userWorkoutExerciseId` to the `UserSet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserSet" DROP CONSTRAINT "UserSet_coreSetId_fkey";

-- AlterTable
ALTER TABLE "UserSet" DROP COLUMN "coreSetId",
ADD COLUMN     "userWorkoutExerciseId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserWorkoutExercise" (
    "id" TEXT NOT NULL,
    "workoutExerciseId" TEXT NOT NULL,
    "userWorkoutId" TEXT NOT NULL,

    CONSTRAINT "UserWorkoutExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWorkout" (
    "id" TEXT NOT NULL,
    "dateCompleted" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,
    "programId" TEXT,
    "workoutId" TEXT NOT NULL,

    CONSTRAINT "UserWorkout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserSet" ADD CONSTRAINT "UserSet_userWorkoutExerciseId_fkey" FOREIGN KEY ("userWorkoutExerciseId") REFERENCES "UserWorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWorkoutExercise" ADD CONSTRAINT "UserWorkoutExercise_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "WorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWorkoutExercise" ADD CONSTRAINT "UserWorkoutExercise_userWorkoutId_fkey" FOREIGN KEY ("userWorkoutId") REFERENCES "UserWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWorkout" ADD CONSTRAINT "UserWorkout_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWorkout" ADD CONSTRAINT "UserWorkout_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
