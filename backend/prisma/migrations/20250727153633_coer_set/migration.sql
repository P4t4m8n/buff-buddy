/*
Warnings:

- You are about to drop the column `coreSetsId` on the `WorkoutExercise` table. All the data in the column will be lost.
- Added the required column `coreSetId` to the `WorkoutExercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkoutExercise"
DROP CONSTRAINT "WorkoutExercise_coreSetsId_fkey";

-- AlterTable
ALTER TABLE "WorkoutExercise"
RENAME COLUMN "coreSetsId" TO "coreSetId";

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_coreSetId_fkey" FOREIGN KEY ("coreSetId") REFERENCES "CoreSet" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "UserSet"
ADD COLUMN "isWarmup" BOOLEAN NOT NULL DEFAULT false;