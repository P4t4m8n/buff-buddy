/*
  Warnings:

  - You are about to drop the column `avgSpeed` on the `CoreCardioSet` table. All the data in the column will be lost.
  - You are about to drop the column `calorieTarget` on the `CoreCardioSet` table. All the data in the column will be lost.
  - You are about to drop the column `distance` on the `CoreCardioSet` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `CoreCardioSet` table. All the data in the column will be lost.
  - You are about to drop the column `coreSetId` on the `WorkoutExercise` table. All the data in the column will be lost.
  - You are about to drop the `CoreSet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoreSetReps` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoreSetWeight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."CoreSetReps" DROP CONSTRAINT "CoreSetReps_coreSetId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CoreSetWeight" DROP CONSTRAINT "CoreSetWeight_coreSetId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserSet" DROP CONSTRAINT "UserSet_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserSet" DROP CONSTRAINT "UserSet_userWorkoutExerciseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_coreSetId_fkey";

-- AlterTable
ALTER TABLE "public"."CoreCardioSet" DROP COLUMN "avgSpeed",
DROP COLUMN "calorieTarget",
DROP COLUMN "distance",
DROP COLUMN "duration";

-- AlterTable
ALTER TABLE "public"."WorkoutExercise" DROP COLUMN "coreSetId",
ADD COLUMN     "coreStrengthSetId" TEXT;

-- DropTable
DROP TABLE "public"."CoreSet";

-- DropTable
DROP TABLE "public"."CoreSetReps";

-- DropTable
DROP TABLE "public"."CoreSetWeight";

-- DropTable
DROP TABLE "public"."UserSet";

-- DropEnum
DROP TYPE "public"."MuscleGroup";

-- CreateTable
CREATE TABLE "public"."CoreCardioSetCalorieTarget" (
    "id" TEXT NOT NULL,
    "coreCardioSetId" TEXT NOT NULL,
    "calorieTarget" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoreCardioSetCalorieTarget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoreCardioSetDistance" (
    "id" TEXT NOT NULL,
    "coreCardioSetId" TEXT NOT NULL,
    "distance" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoreCardioSetDistance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoreCardioSetAvgSpeed" (
    "id" TEXT NOT NULL,
    "coreCardioSetId" TEXT NOT NULL,
    "avgSpeed" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoreCardioSetAvgSpeed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoreCardioSetWorkoutTime" (
    "id" TEXT NOT NULL,
    "coreCardioSetId" TEXT NOT NULL,
    "workTime" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoreCardioSetWorkoutTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserCardioSet" (
    "id" TEXT NOT NULL,
    "warmupTime" INTEGER DEFAULT 0,
    "workTime" INTEGER,
    "avgHeartRate" INTEGER,
    "avgSpeed" DOUBLE PRECISION,
    "distance" DOUBLE PRECISION,
    "order" INTEGER NOT NULL DEFAULT 1,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "calorieTarget" INTEGER,
    "userWorkoutExerciseId" TEXT NOT NULL,
    "skippedReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCardioSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoreStrengthSet" (
    "id" TEXT NOT NULL,
    "restTime" INTEGER NOT NULL DEFAULT 60,
    "numberOfSets" INTEGER NOT NULL DEFAULT 1,
    "hasWarmup" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoreStrengthSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoreStrengthSetReps" (
    "id" TEXT NOT NULL,
    "coreStrengthSetId" TEXT NOT NULL,
    "reps" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoreStrengthSetReps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoreStrengthSetWeight" (
    "id" TEXT NOT NULL,
    "coreStrengthSetId" TEXT NOT NULL,
    "isBodyWeight" BOOLEAN NOT NULL DEFAULT false,
    "weight" DOUBLE PRECISION DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoreStrengthSetWeight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserStrengthSet" (
    "id" TEXT NOT NULL,
    "reps" INTEGER NOT NULL DEFAULT 0,
    "weight" DOUBLE PRECISION DEFAULT 0,
    "isBodyWeight" BOOLEAN NOT NULL DEFAULT false,
    "restTime" INTEGER NOT NULL DEFAULT 60,
    "order" INTEGER NOT NULL DEFAULT 1,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "isWarmup" BOOLEAN NOT NULL DEFAULT false,
    "isMuscleFailure" BOOLEAN NOT NULL DEFAULT false,
    "isJointPain" BOOLEAN NOT NULL DEFAULT false,
    "skippedReason" TEXT,
    "userWorkoutExerciseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserStrengthSet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."CoreCardioSetCalorieTarget" ADD CONSTRAINT "CoreCardioSetCalorieTarget_coreCardioSetId_fkey" FOREIGN KEY ("coreCardioSetId") REFERENCES "public"."CoreCardioSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoreCardioSetDistance" ADD CONSTRAINT "CoreCardioSetDistance_coreCardioSetId_fkey" FOREIGN KEY ("coreCardioSetId") REFERENCES "public"."CoreCardioSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoreCardioSetAvgSpeed" ADD CONSTRAINT "CoreCardioSetAvgSpeed_coreCardioSetId_fkey" FOREIGN KEY ("coreCardioSetId") REFERENCES "public"."CoreCardioSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoreCardioSetWorkoutTime" ADD CONSTRAINT "CoreCardioSetWorkoutTime_coreCardioSetId_fkey" FOREIGN KEY ("coreCardioSetId") REFERENCES "public"."CoreCardioSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserCardioSet" ADD CONSTRAINT "UserCardioSet_userWorkoutExerciseId_fkey" FOREIGN KEY ("userWorkoutExerciseId") REFERENCES "public"."UserWorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoreStrengthSetReps" ADD CONSTRAINT "CoreStrengthSetReps_coreStrengthSetId_fkey" FOREIGN KEY ("coreStrengthSetId") REFERENCES "public"."CoreStrengthSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoreStrengthSetWeight" ADD CONSTRAINT "CoreStrengthSetWeight_coreStrengthSetId_fkey" FOREIGN KEY ("coreStrengthSetId") REFERENCES "public"."CoreStrengthSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserStrengthSet" ADD CONSTRAINT "UserStrengthSet_userWorkoutExerciseId_fkey" FOREIGN KEY ("userWorkoutExerciseId") REFERENCES "public"."UserWorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_coreStrengthSetId_fkey" FOREIGN KEY ("coreStrengthSetId") REFERENCES "public"."CoreStrengthSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
