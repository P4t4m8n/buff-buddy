/*
  Warnings:

  - You are about to drop the column `coreCardioSetId` on the `WorkoutExercise` table. All the data in the column will be lost.
  - You are about to drop the column `coreStrengthSetId` on the `WorkoutExercise` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[workoutExerciseId]` on the table `CoreCardioSet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[workoutExerciseId]` on the table `CoreStrengthSet` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_coreCardioSetId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_coreStrengthSetId_fkey";

-- DropIndex
DROP INDEX "public"."WorkoutExercise_coreCardioSetId_key";

-- DropIndex
DROP INDEX "public"."WorkoutExercise_coreStrengthSetId_key";

-- AlterTable
ALTER TABLE "public"."CoreCardioSet" ADD COLUMN     "workoutExerciseId" TEXT;

-- AlterTable
ALTER TABLE "public"."CoreStrengthSet" ADD COLUMN     "workoutExerciseId" TEXT;

-- AlterTable
ALTER TABLE "public"."WorkoutExercise" DROP COLUMN "coreCardioSetId",
DROP COLUMN "coreStrengthSetId";

-- CreateIndex
CREATE UNIQUE INDEX "CoreCardioSet_workoutExerciseId_key" ON "public"."CoreCardioSet"("workoutExerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "CoreStrengthSet_workoutExerciseId_key" ON "public"."CoreStrengthSet"("workoutExerciseId");

-- AddForeignKey
ALTER TABLE "public"."CoreCardioSet" ADD CONSTRAINT "CoreCardioSet_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "public"."WorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoreStrengthSet" ADD CONSTRAINT "CoreStrengthSet_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "public"."WorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
