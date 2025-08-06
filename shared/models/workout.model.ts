import type { IUserDTO } from "./user.model";
import type { IExerciseDTO } from "./exercise.model";
import type {
  ICoreStrengthSetDTO,
  ICoreStrengthSetEditDTO,
} from "./strengthSet.model";
import type { IEntity } from "./entity.model";
import type { TDayOfWeek, IBaseFilter, TCrudOperation } from "./app.model";
import type { IProgramDTO } from "./program.model";
import type { ICoreCardioSetEditDTO } from "./cardioSet.model";
import { ExerciseType } from "../../backend/prisma/generated/prisma";

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
  coreStrengthSet?: ICoreStrengthSetDTO | null;
  coreCardioSet?: ICoreCardioSetEditDTO | null;
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
  coreStrengthSet?: ICoreStrengthSetEditDTO;
  coreCardioSet?: ICoreCardioSetEditDTO;
  exerciseData: {
    id: string;
    type: ExerciseType;
  } | null; //For backend relationship
  exercise?: IExerciseDTO; //Exists only on the front to show the exercise details
  crudOperation?: TCrudOperation;
}

export interface IWorkoutExerciseEditSet {
  crudOperation?: TCrudOperation;
  workoutExerciseId?: string;
}

export interface IWorkoutFilter extends IBaseFilter {
  programId?: string;
  dayOfWeek?: TDayOfWeek;
  exerciseId?: string;
  isCompleted?: boolean;
}
