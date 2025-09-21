import type { TCrudOperation } from "./app.model";
import type { IEntity, IEntityDates } from "./entity.model";

export interface IUserStrengthSetDTO extends IEntity, IEntityDates {
  lastSet?: IUserStrengthLastSet | null;
  goalSet?: IGoalSet | null;
  reps?: number | null; // Actual number of repetitions performed
  weight?: number | null; // Actual weight lifted in kg
  isWarmup?: boolean; // Indicates if the set was a warmup set
  isCompleted?: boolean | null; // Indicates if the set was completed but not necessarily successful
  isMuscleFailure?: boolean | null; // Indicates if the set was a muscle failure
  isJointPain?: boolean | null; // Indicates if the set was a joint part
  isBodyWeight?: boolean; // Indicates if the set was bodyweight only
  order?: number | null;
  skippedReason?: string | null;
}

interface IUserStrengthLastSet {
  lastIsMuscleFailure?: boolean | null; // Last recorded muscle failure status
  lastReps?: number | null; // Last recorded repetitions for the set
  lastIsJointPain?: boolean | null; // Last recorded joint pain status
  lastWeight?: number | null; // Last recorded weight for the set
  lastSkippedReason?: string | null; // Last recorded skipped reason for the set
}

export interface IUserStrengthSetEditDTO extends IUserStrengthSetDTO {
  programExerciseId?: string;
  crudOperation?: TCrudOperation;
  order?: number|null;
  isWarmup?: boolean; // A warmup set is not saved in the db so this use is only temp for front UI
}

export interface IGoalSet {
  reps?: number | null;
  weight?: number | null;
}
