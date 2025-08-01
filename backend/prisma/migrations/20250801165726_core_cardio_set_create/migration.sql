-- AlterTable
ALTER TABLE "public"."WorkoutExercise" ADD COLUMN     "coreCardioSetId" TEXT,
ALTER COLUMN "coreSetId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."CoreCardioSet" (
    "id" TEXT NOT NULL,
    "warmupTime" INTEGER,
    "avgHeartRate" INTEGER,
    "avgSpeed" DOUBLE PRECISION,
    "distance" DOUBLE PRECISION,
    "calorieTarget" INTEGER,
    "duration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoreCardioSet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_coreCardioSetId_fkey" FOREIGN KEY ("coreCardioSetId") REFERENCES "public"."CoreCardioSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
