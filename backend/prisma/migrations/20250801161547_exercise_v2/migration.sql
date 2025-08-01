/*
  Warnings:

  - You are about to drop the column `types` on the `Exercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Exercise" DROP COLUMN "types",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "type" "public"."ExerciseType" NOT NULL DEFAULT 'strength';
