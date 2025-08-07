import type { TCrudOperation } from "./app.model";
import type { IEntity } from "./entity.model";

export interface ICoreStrengthSetDTO extends IEntity {
  reps?: number | null; // Target number of repetitions for the set
  weight?: number | null; // Weight lifted in kg
  numberOfSets?: number; // Total number of sets in the exercise
  isBodyWeight?: boolean; // Indicates if the set is bodyweight only
  restTime?: number | null; // Rest time in seconds before the next set
  hasWarmup?: boolean; // Indicates if the set was a warmup set
}
export interface ICoreStrengthSetEditDTO extends ICoreStrengthSetDTO {
  crudOperation?: TCrudOperation;
  workoutExerciseId?: string; // Foreign key to ProgramExercise
}

export interface IUserStrengthSetDTO extends IEntity {
  lastSet?: IUserStrengthLastSet|null;
  reps?: number | null; // Actual number of repetitions performed
  weight?: number | null; // Actual weight lifted in kg
  isWarmup?: boolean; // Indicates if the set was a warmup set
  isCompleted?: boolean | null; // Indicates if the set was completed but not necessarily successful
  isMuscleFailure?: boolean | null; // Indicates if the set was a muscle failure
  lastIsMuscleFailure?: boolean | null; // Last recorded muscle failure status
  isJointPain?: boolean | null; // Indicates if the set was a joint part
  lastIsJointPain?: boolean | null; // Last recorded joint pain status
  isBodyWeight?: boolean; // Indicates if the set was bodyweight only
  order?: number;
  skippedReason?: string | null;
}

interface IUserStrengthLastSet {
  lastReps?: number | null; // Last recorded repetitions for the set
  lastWeight?: number | null; // Last recorded weight for the set
  lastSkippedReason?: string | null; // Last recorded skipped reason for the set
}

export interface IUserStrengthSetEditDTO extends IUserStrengthSetDTO {
  coreSetId?: string; // Foreign key to CoreSet
  programExerciseId?: string;
  crudOperation?: TCrudOperation;
  order?: number;
  isWarmup?: boolean; // A warmup set is not saved in the db so this use is only temp for front UI
}
