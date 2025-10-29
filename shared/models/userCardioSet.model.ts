import type { TCrudOperation } from "./app.model";
import type { IID, IEntityDates } from "./entity.model";

export interface IUserCardioSetDTO extends IID, IEntityDates {
  workTime?: number | null; // Actual work time in seconds
  avgHeartRate?: number | null; // Actual average heart rate during the set
  avgSpeed?: number | null; // Actual average speed during the set
  distance?: number | null; // Actual distance covered during the set
  caloriesBurned?: number | null; // Actual calories burned during the set
  isCompleted?: boolean | null; // Indicates if the cardio set was completed
  skippedReason?: string | null; // Reason for skipping the cardio set
  order?: number; // Order of the cardio set in the workout
  lastSet?: IUserCardioLastSet | null; // Last recorded set details
}

export interface IUserCardioLastSet {
  lastSkippedReason?: string | null; // Last recorded reason for skipping
  lastDistance?: number | null; // Last recorded distance
  lastWorkTime?: number | null; // Last recorded work time for the set
  lastAvgHeartRate?: number | null; // Last recorded average heart rate
  lastAvgSpeed?: number | null; // Last recorded average speed
  lastCaloriesBurned?: number | null; // Last recorded calories burned
}

export interface IUserCardioSetEditDTO extends IUserCardioSetDTO {
  coreSetId?: string; // Foreign key to CoreCardioSet
  programExerciseId?: string; // Foreign key to ProgramExercise
  crudOperation?: TCrudOperation; // CRUD operation type
  order?: number; // Order of the cardio set in the workout
}
