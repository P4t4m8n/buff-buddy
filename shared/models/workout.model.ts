import type {
  DaysOfWeek,
  ExerciseType,
} from "../../backend/prisma/generated/prisma";
import type { IUserDTO } from "./user.model";
import type { IExerciseDTO } from "./exercise.model";
import type { IEntity, IEntityDates } from "./entity.model";
import type { IBaseFilter, TCrudOperation } from "./app.model";
import type { IProgramDTO } from "./program.model";

interface IWorkoutBase extends IEntity, IEntityDates {
  name?: string | null;
  notes?: string | null;
  isTemplate?: boolean;
}

export interface IWorkoutDTO extends IWorkoutBase {
  program?: Partial<IProgramDTO>;
  owner?: Partial<IUserDTO> | null;
  workoutExercises?: IWorkoutExerciseDTO[];
}

export interface IWorkoutExerciseDTO extends IEntity, IEntityDates {
  order?: number;
  notes?: string | null;
  exercise?: IExerciseDTO;
  hasWarmUp?: boolean;
  isBodyWeight?: boolean;
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
  exerciseData: {
    id: string;
    type: ExerciseType;
  } | null; //For backend relationship
  exercise?: IExerciseDTO; //Exists only on the front to show the exercise details
  crudOperation?: TCrudOperation;
  hasWarmUp?: boolean;
  isBodyWeight?: boolean;
}

export interface IWorkoutExerciseEditSet {
  crudOperation?: TCrudOperation;
  workoutExerciseId?: string;
}

export interface IWorkoutFilter extends IBaseFilter {
  programId?: string | null;
  dayOfWeek?: DaysOfWeek | null;
  exerciseId?: string | null;
  isCompleted?: boolean | null;
  isTemplate?: boolean | null;
}
