-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "isSeparateHands" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "WorkoutExercise" ADD COLUMN     "isDropSet" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isMyoReps" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maxNumberOfReps" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "numberOfSets" INTEGER NOT NULL DEFAULT 3;
