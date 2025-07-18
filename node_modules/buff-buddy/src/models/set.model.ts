import type { IEntity } from "../../../shared/models/entity.model";
import type { TCrudOperation } from "./programExercise.model";

export interface ICoreSetDTO extends IEntity {
  reps: number | null; // Target number of repetitions for the set
  weight?: number | null; // Weight lifted in kg
  isBodyWeight?: boolean; // Indicates if the set is bodyweight only
  restTime: number | null; // Rest time in seconds before the next set
  order: number | null; // Order of the set in the exercise
  isWarmup: boolean; // Indicates if the set was a warmup set
}
export interface ICoreSetEditDTO extends ICoreSetDTO {
  crudOperation?: TCrudOperation;
  programExerciseId?: string; // Foreign key to ProgramExercise
}

export interface IUserSetDTO extends IEntity {
  reps?: number | null; // Actual number of repetitions performed
  weight?: number | null; // Actual weight lifted in kg
  restTime?: number | null; // Actual rest time in seconds before the next set
  isCompleted?: boolean | null; // Indicates if the set was completed but not necessarily successful
  isMuscleFailure?: boolean | null; // Indicates if the set was a muscle failure
  isJointPain?: boolean | null; // Indicates if the set was a joint part
  coreSet?: ICoreSetDTO; // Reference to the core set associated with this user set
  isBodyWeight?: boolean; // Indicates if the set was bodyweight only
}

export interface IUserSetEditDTO extends Omit<IUserSetDTO, "coreSet"> {
  coreSetId?: string; // Foreign key to CoreSet
  programExerciseId?: string;
  crudOperation?: TCrudOperation;
}
