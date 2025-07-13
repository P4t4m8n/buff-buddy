/*
  Warnings:

  - You are about to drop the column `isJoinPain` on the `UserSet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSet" DROP COLUMN "isJoinPain",
ADD COLUMN     "isJointPain" BOOLEAN NOT NULL DEFAULT false;
