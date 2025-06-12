import type { TDayOfWeek } from "./app.model";
import type { IEntity } from "./entity.model";
import type { IExerciseDTO } from "./exercise.model";
import type {
  ICoreSetDTO,
  ICoreSetEditDTO,
  IUserSetEditDTO,
} from "./set.model";

interface IBaseProgramExercise {
  order: number;
  note?: string;
  daysOfWeek?: TDayOfWeek[];
}

export interface IProgramExerciseDTO extends IBaseProgramExercise, IEntity {
  exercise: IExerciseDTO;
  sets: ICoreSetDTO[];
}

export interface IWorkoutExercise extends IBaseProgramExercise, IEntity {
  exercise: IExerciseDTO;

  sets: {
    coreSet: ICoreSetDTO;
    userSet: IUserSetEditDTO;
  }[];
}

export interface IProgramExerciseEditDTO extends IBaseProgramExercise, IEntity {
  programId?: string;
  exerciseId: string;
  sets: ICoreSetEditDTO[];
}
