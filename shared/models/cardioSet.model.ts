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
  avgHeartRate?: number | null; // Actual average heart rate during the set
  avgSpeed?: number | null; // Actual average speed during the set
  distance?: number | null; // Actual distance covered during the set
  caloriesBurned?: number | null; // Actual calories burned during the set
  isCompleted?: boolean | null; // Indicates if the cardio set was completed
  skippedReason?: string | null; // Reason for skipping the cardio set
  order?: number; // Order of the cardio set in the workout
}
