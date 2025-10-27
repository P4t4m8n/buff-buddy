import type { ExerciseType } from "../../backend/prisma/generated/prisma";
import type { IUserDTO } from "./user.model";
import type { IExerciseDTO } from "./exercise.model";
import type { IID, IEntityDates, IEntity } from "./entity.model";
import type { IBaseFilter, ICrudOperation } from "./app.model";
import type { IProgramDTO } from "./program.model";

interface IWorkoutBase extends IEntity {
  name?: string | null;
  notes?: string | null;
  isTemplate?: boolean;
  sourceWorkoutId?: string | null; //TODO:I Have no idea what it is and way i added it
}

export interface IWorkoutDTO extends IWorkoutBase {
  programs?: Partial<IProgramDTO>[] | null;
  owner?: Partial<IUserDTO> | null;
  workoutExercises?: IWorkoutExerciseDTO[];
}

export interface IWorkoutEditDTO extends IWorkoutBase, ICrudOperation {
  ownerId?: string | null;
  workoutExercises?: IWorkoutExerciseEditDTO[];
}

interface IWorkoutExerciseBase extends IID {
  order?: number | null;
  notes?: string | null;
  hasWarmup?: boolean;
  isBodyWeight?: boolean;
  restTime?: number | null;
  numberOfSets?: number | null;
  maxNumberOfReps?: number | null;
  isDropSet?: boolean;
  isMyoReps?: boolean;
}
export interface IWorkoutExerciseDTO
  extends IWorkoutExerciseBase,
    IEntityDates {
  exercise?: IExerciseDTO;
}

export interface IWorkoutExerciseEditDTO
  extends IWorkoutExerciseBase,
    ICrudOperation {
  exerciseData?: {
    id: string;
    type: ExerciseType;
  } | null; //For backend relationship
  exercise?: IExerciseDTO | null; //Exists only on the front to show the exercise details
}

export interface IWorkoutFilter extends IBaseFilter {
  programName?: string | null;
  exerciseName?: string | null;
  ownerName?: string | null;
  programId?: string | null;
  userId?: string | null;
  exerciseId?: string | null;
  isTemplate?: boolean | string | null;
  workoutName?: string | null;
}
