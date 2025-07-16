-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "daysOfWeek" "DaysOfWeek"[] DEFAULT ARRAY[]::"DaysOfWeek"[];
