-- AlterTable
ALTER TABLE "public"."ProgramWorkout" ADD COLUMN     "level" TEXT NOT NULL DEFAULT 'beginner',
ADD COLUMN     "workoutGoal" TEXT NOT NULL DEFAULT 'hypertrophy';
