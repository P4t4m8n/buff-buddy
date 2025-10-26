/*
  Warnings:

  - You are about to drop the column `userId` on the `UserMeal` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `UserMeal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."UserMeal" DROP CONSTRAINT "UserMeal_userId_fkey";

-- AlterTable
ALTER TABLE "UserMeal" DROP COLUMN "userId",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserMeal" ADD CONSTRAINT "UserMeal_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
