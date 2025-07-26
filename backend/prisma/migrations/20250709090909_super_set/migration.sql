-- AlterTable
ALTER TABLE "CoreSet" ADD COLUMN     "programExerciseSuperSetId" TEXT,
ALTER COLUMN "programExerciseId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ProgramExerciseSuperSet" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "notes" TEXT,
    "daysOfWeek" "DaysOfWeek"[],
    "programId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramExerciseSuperSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseToProgramExerciseSuperSet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ExerciseToProgramExerciseSuperSet_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ExerciseToProgramExerciseSuperSet_B_index" ON "_ExerciseToProgramExerciseSuperSet"("B");

-- AddForeignKey
ALTER TABLE "CoreSet" ADD CONSTRAINT "CoreSet_programExerciseSuperSetId_fkey" FOREIGN KEY ("programExerciseSuperSetId") REFERENCES "ProgramExerciseSuperSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramExerciseSuperSet" ADD CONSTRAINT "ProgramExerciseSuperSet_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToProgramExerciseSuperSet" ADD CONSTRAINT "_ExerciseToProgramExerciseSuperSet_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToProgramExerciseSuperSet" ADD CONSTRAINT "_ExerciseToProgramExerciseSuperSet_B_fkey" FOREIGN KEY ("B") REFERENCES "ProgramExerciseSuperSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
