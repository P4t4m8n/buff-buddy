/*
  Warnings:

  - You are about to drop the `CoreCardioSet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoreCardioSetAvgSpeed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoreCardioSetCalorieTarget` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoreCardioSetDistance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoreCardioSetWorkoutTime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoreStrengthSet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoreStrengthSetReps` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoreStrengthSetWeight` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."CoreCardioSetAvgSpeed" DROP CONSTRAINT "CoreCardioSetAvgSpeed_coreCardioSetId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CoreCardioSetCalorieTarget" DROP CONSTRAINT "CoreCardioSetCalorieTarget_coreCardioSetId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CoreCardioSetDistance" DROP CONSTRAINT "CoreCardioSetDistance_coreCardioSetId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CoreCardioSetWorkoutTime" DROP CONSTRAINT "CoreCardioSetWorkoutTime_coreCardioSetId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CoreStrengthSetReps" DROP CONSTRAINT "CoreStrengthSetReps_coreStrengthSetId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CoreStrengthSetWeight" DROP CONSTRAINT "CoreStrengthSetWeight_coreStrengthSetId_fkey";

-- DropTable
DROP TABLE "public"."CoreCardioSet";

-- DropTable
DROP TABLE "public"."CoreCardioSetAvgSpeed";

-- DropTable
DROP TABLE "public"."CoreCardioSetCalorieTarget";

-- DropTable
DROP TABLE "public"."CoreCardioSetDistance";

-- DropTable
DROP TABLE "public"."CoreCardioSetWorkoutTime";

-- DropTable
DROP TABLE "public"."CoreStrengthSet";

-- DropTable
DROP TABLE "public"."CoreStrengthSetReps";

-- DropTable
DROP TABLE "public"."CoreStrengthSetWeight";
