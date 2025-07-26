/*
  Warnings:

  - You are about to drop the column `isBodyWeight` on the `CoreSet` table. All the data in the column will be lost.
  - You are about to drop the column `isHistory` on the `CoreSet` table. All the data in the column will be lost.
  - You are about to drop the column `isWarmup` on the `CoreSet` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `CoreSet` table. All the data in the column will be lost.
  - You are about to drop the column `reps` on the `CoreSet` table. All the data in the column will be lost.
  - You are about to drop the column `repsInReserve` on the `CoreSet` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `CoreSet` table. All the data in the column will be lost.
  - You are about to drop the column `workoutExerciseId` on the `CoreSet` table. All the data in the column will be lost.
  - You are about to drop the column `workoutExerciseSuperSetId` on the `CoreSet` table. All the data in the column will be lost.
  - You are about to drop the `WorkoutExerciseSuperSet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutSet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExerciseToWorkoutExerciseSuperSet` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `coreSetsId` to the `WorkoutExercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CoreSet" DROP CONSTRAINT "CoreSet_workoutExerciseId_fkey";

-- DropForeignKey
ALTER TABLE "CoreSet" DROP CONSTRAINT "CoreSet_workoutExerciseSuperSetId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExerciseSuperSet" DROP CONSTRAINT "WorkoutExerciseSuperSet_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutSet" DROP CONSTRAINT "WorkoutSet_WorkoutExerciseId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutSet" DROP CONSTRAINT "WorkoutSet_coreSetId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutSet" DROP CONSTRAINT "WorkoutSet_userSetId_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToWorkoutExerciseSuperSet" DROP CONSTRAINT "_ExerciseToWorkoutExerciseSuperSet_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToWorkoutExerciseSuperSet" DROP CONSTRAINT "_ExerciseToWorkoutExerciseSuperSet_B_fkey";

-- AlterTable
ALTER TABLE "CoreSet" DROP COLUMN "isBodyWeight",
DROP COLUMN "isHistory",
DROP COLUMN "isWarmup",
DROP COLUMN "order",
DROP COLUMN "reps",
DROP COLUMN "repsInReserve",
DROP COLUMN "weight",
DROP COLUMN "workoutExerciseId",
DROP COLUMN "workoutExerciseSuperSetId",
ADD COLUMN     "hasWarmup" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "numberOfSets" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "WorkoutExercise" ADD COLUMN     "coreSetsId" TEXT NOT NULL,
ALTER COLUMN "order" SET DEFAULT 0;

-- DropTable
DROP TABLE "WorkoutExerciseSuperSet";

-- DropTable
DROP TABLE "WorkoutSet";

-- DropTable
DROP TABLE "_ExerciseToWorkoutExerciseSuperSet";

-- CreateTable
CREATE TABLE "CoreSetReps" (
    "id" TEXT NOT NULL,
    "coreSetId" TEXT NOT NULL,
    "reps" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoreSetReps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoreSetWeight" (
    "id" TEXT NOT NULL,
    "coreSetId" TEXT NOT NULL,
    "isBodyWeight" BOOLEAN NOT NULL DEFAULT false,
    "weight" DOUBLE PRECISION DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoreSetWeight_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoreSetReps" ADD CONSTRAINT "CoreSetReps_coreSetId_fkey" FOREIGN KEY ("coreSetId") REFERENCES "CoreSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoreSetWeight" ADD CONSTRAINT "CoreSetWeight_coreSetId_fkey" FOREIGN KEY ("coreSetId") REFERENCES "CoreSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_coreSetsId_fkey" FOREIGN KEY ("coreSetsId") REFERENCES "CoreSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
