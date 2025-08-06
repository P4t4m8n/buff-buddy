import type { TCrudOperation } from "./app.model";
import type { IEntity } from "./entity.model";
import type { IWorkoutExerciseEditSet } from "./workout.model";

export interface ICoreCardioSetDTO extends IEntity {
  warmupTime?: number | null; // Warmup time in seconds
  workTime?: number | null; // Work time in seconds
  avgHeartRate?: number | null; // Average heart rate during the set
  avgSpeed?: number | null; // Average speed km during the set
  distance?: number | null; // Distance in meters covered during the set
  calorieTarget?: number | null; // Target calories to burn during the set
}

export interface ICoreCardioSetEditDTO
  extends ICoreCardioSetDTO,
    IWorkoutExerciseEditSet {}

export interface IUserCardioSetDTO extends IEntity {
  workTime?: number | null; // Actual work time in seconds
  lastWorkTime?: number | null; // Last recorded work time for the set
  avgHeartRate?: number | null; // Actual average heart rate during the set
  lastAvgHeartRate?: number | null; // Last recorded average heart rate
  avgSpeed?: number | null; // Actual average speed during the set
  lastAvgSpeed?: number | null; // Last recorded average speed
  distance?: number | null; // Actual distance covered during the set
  lastDistance?: number | null; // Last recorded distance
  caloriesBurned?: number | null; // Actual calories burned during the set
  lastCaloriesBurned?: number | null; // Last recorded calories burned
  isCompleted?: boolean | null; // Indicates if the cardio set was completed
  skippedReason?: string | null; // Reason for skipping the cardio set
  lastSkippedReason?: string | null; // Last recorded reason for skipping
  order?: number; // Order of the cardio set in the workout
}

export interface IUserCardioSetEditDTO extends IUserCardioSetDTO {
  coreSetId?: string; // Foreign key to CoreCardioSet
  programExerciseId?: string; // Foreign key to ProgramExercise
  crudOperation?: TCrudOperation; // CRUD operation type
  order?: number; // Order of the cardio set in the workout
}
