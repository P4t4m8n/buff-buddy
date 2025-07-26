import type { IUserDTO } from "./user.model";
import type { IExerciseDTO } from "./exercise.model";
import type { ICoreSetDTO, ICoreSetEditDTO } from "./set.model";
import type { IEntity } from "./entity.model";
import type { TDayOfWeek, IBaseFilter, TCrudOperation } from "./app.model";
import type { IProgramDTO } from "./program.model";

interface IWorkoutBase extends IEntity {
  name?: string | null;
  notes?: string | null;
}

export interface IWorkoutDTO extends IWorkoutBase {
  program?: Partial<IProgramDTO>;
  owner?: Partial<IUserDTO> | null;
  workoutExercises?: IWorkoutExerciseDTO[];
}

export interface IWorkoutExerciseDTO extends IEntity {
  order?: number;
  notes?: string | null;
  exercise?: IExerciseDTO;
  coreSets?: ICoreSetDTO;
}

export interface IWorkoutEditDTO extends IWorkoutBase {
  programId?: string | null;
  ownerId?: string | null;
  workoutExercises?: IWorkoutExerciseEditDTO[];
  crudOperation?: TCrudOperation;
}

export interface IWorkoutExerciseEditDTO extends IEntity {
  order?: number;
  notes?: string | null;
  coreSets?: ICoreSetEditDTO;
  exerciseId?: string; //For backend relationship
  exercise?: IExerciseDTO; //Exists only on the front to show the exercise details
  crudOperation?: TCrudOperation;
}

export interface IWorkoutFilter extends IBaseFilter {
  programId?: string;
  dayOfWeek?: TDayOfWeek;
  exerciseId?: string;
  isCompleted?: boolean;
}

