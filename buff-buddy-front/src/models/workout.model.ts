import type { IBaseFilter, TDayOfWeek } from "./app.model";
import type { IEntity } from "./entity.model";
import type { IExerciseDTO } from "./exercise.model";
import type { IProgramDTO } from "./program.model";
import type { ICoreSetDTO, IUserSetEditDTO } from "./set.model";

export interface IWorkoutDTO extends IEntity {
  program: Partial<IProgramDTO>;
  dayOfWeek: TDayOfWeek;
  workoutExercises?: IWorkoutExerciseDTO[];
}
export interface IWorkoutEditDTO extends IEntity {
  programId?: string;
  date: Date;
  workoutSets: IUserSetEditDTO[];
}

export interface IWorkoutExerciseDTO extends IEntity {
  exercise: IExerciseDTO;
  sets: IWorkoutSets[];
}
export interface IWorkoutExerciseEditDTO extends IEntity {
  exerciseId?: string;
  sets: IUserSetEditDTO[];
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
