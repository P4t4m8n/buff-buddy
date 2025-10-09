import type { ExerciseType } from "../../backend/prisma/generated/prisma";
import type { IUserDTO } from "./user.model";
import type { IExerciseDTO } from "./exercise.model";
import type { IEntity, IEntityDates } from "./entity.model";
import type { IBaseFilter, TCrudOperation } from "./app.model";
import type { IProgramDTO } from "./program.model";

interface IWorkoutBase extends IEntity, IEntityDates {
  name?: string | null;
  notes?: string | null;
  isTemplate?: boolean;
  sourceWorkoutId?: string | null;
}

export interface IWorkoutDTO extends IWorkoutBase {
  programs?: Partial<IProgramDTO>[] | null;
  owner?: Partial<IUserDTO> | null;
  workoutExercises?: IWorkoutExerciseDTO[];
}

export interface IWorkoutEditDTO extends IWorkoutBase {
  ownerId?: string | null;
  workoutExercises?: IWorkoutExerciseEditDTO[];
  crudOperation?: TCrudOperation;
}

export interface IWorkoutExerciseDTO extends IEntity, IEntityDates {
  order?: number | null;
  notes?: string | null;
  exercise?: IExerciseDTO;
  hasWarmup?: boolean;
  isBodyWeight?: boolean;
  restTime?: number | null;
}

export interface IWorkoutExerciseEditDTO extends IEntity {
  order?: number | null;
  notes?: string | null;
  exerciseData?: {
    id: string;
    type: ExerciseType;
  } | null; //For backend relationship
  exercise?: IExerciseDTO|null; //Exists only on the front to show the exercise details
  crudOperation?: TCrudOperation;
  hasWarmup?: boolean;
  isBodyWeight?: boolean;
  restTime?: number;
}

// export interface IWorkoutExerciseEditSet {
//   crudOperation?: TCrudOperation;
//   workoutExerciseId?: string;
// }

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
