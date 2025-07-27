import type { TCrudOperation } from "./app.model";
import type { IEntity } from "./entity.model";

export interface ICoreSetDTO extends IEntity {
  reps?: number | null; // Target number of repetitions for the set
  weight?: number | null; // Weight lifted in kg
  numberOfSets?: number; // Total number of sets in the exercise
  isBodyWeight?: boolean; // Indicates if the set is bodyweight only
  restTime?: number | null; // Rest time in seconds before the next set
  hasWarmup?: boolean; // Indicates if the set was a warmup set
}
export interface ICoreSetEditDTO extends ICoreSetDTO {
  crudOperation?: TCrudOperation;
  workoutExerciseId?: string; // Foreign key to ProgramExercise
}

export interface IUserSetDTO extends IEntity {
  reps?: number | null; // Actual number of repetitions performed
  weight?: number | null; // Actual weight lifted in kg
  isWarmup?: boolean; // Indicates if the set was a warmup set
  isCompleted?: boolean | null; // Indicates if the set was completed but not necessarily successful
  isMuscleFailure?: boolean | null; // Indicates if the set was a muscle failure
  isJointPain?: boolean | null; // Indicates if the set was a joint part
  isBodyWeight?: boolean; // Indicates if the set was bodyweight only
}

export interface IUserSetEditDTO extends Omit<IUserSetDTO, "coreSet"> {
  coreSetId?: string; // Foreign key to CoreSet
  programExerciseId?: string;
  crudOperation?: TCrudOperation;
}
