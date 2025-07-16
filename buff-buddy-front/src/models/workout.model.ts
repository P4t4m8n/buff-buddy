import type { IBaseFilter, TDayOfWeek } from "./app.model";
import type { IEntity } from "./entity.model";
import type { IExerciseDTO } from "./exercise.model";
import type { IProgramDTO } from "./program.model";
import type { TCrudOperation } from "./programExercise.model";
import type {
  ICoreSetDTO,
  ICoreSetEditDTO,
  IUserSetEditDTO,
} from "./set.model";
import type { IUserDTO } from "./user.model";

interface IWorkoutBase extends IEntity {
  name?: string;
  notes?: string;
  daysOfWeek?: TDayOfWeek[];
}

export interface IWorkoutDTO extends IWorkoutBase {
  program?: Partial<IProgramDTO>;
  user?: Partial<IUserDTO>;
  workoutExercises?: IWorkoutExerciseDTO[];
}

export interface IWorkoutEditDTO extends IWorkoutBase {
  programId?: string | null;
  userId?: string | null;
  workoutExercises?: IWorkoutExerciseEditDTO[];
  crudOperation?: TCrudOperation;
}

export interface IWorkoutExerciseDTO extends IEntity {
  exercise?: IExerciseDTO;
  coreSets?: ICoreSetDTO[];
}
export interface IWorkoutExerciseEditDTO extends IEntity {
  order?: number;
  notes?: string;
  coreSets?: ICoreSetEditDTO[];
  exerciseId?: string; //For backend relationship
  exercise?: IExerciseDTO; //Exists only on the front to show the exercise details
  crudOperation?: TCrudOperation;
}

export interface IWorkoutSets {
  coreSet: ICoreSetDTO;
  userSet: IUserSetEditDTO;
}
export interface IWorkoutEditSets {
  coreSetId: string;
  userSet: IUserSetEditDTO;
}

export interface IWorkoutFilter extends IBaseFilter {
  programId?: string;
  dayOfWeek?: TDayOfWeek;
  exerciseId?: string;
  isCompleted?: boolean;
}

export interface IOldWorkOut extends IEntity {
  program: Partial<IProgramDTO>;
  dayOfWeek: TDayOfWeek;
  workoutExercises?: IWorkoutExerciseDTO[];
}
export interface IIOldWorkOutEditDTO extends IEntity {
  programId?: string;
  date: Date;
  workoutSets: IUserSetEditDTO[];
}
