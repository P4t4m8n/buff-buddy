import type {
  DaysOfWeek,
  WorkoutGoal,
  WorkoutLevel,
} from "../../backend/prisma/generated/prisma";
import { WORKOUT_GOALS, WORKOUT_LEVELS } from "../consts/program.consts";
import type { IBaseFilter, TCrudOperation, TDayOfWeek } from "./app.model";
import type { IEntity } from "./entity.model";
import type { IUserDTO } from "./user.model";
import type { IWorkoutDTO, IWorkoutEditDTO } from "./workout.model";

export interface IProgramBase extends IEntity {
  name?: string | null | undefined;
  notes?: string | null;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
  isActive?: boolean;
  owner?: Partial<IUserDTO>;
}

export interface IProgramDTO extends IProgramBase {
  programWorkouts?: IProgramWorkoutDTO[];
}

export interface IProgramEditDTO extends IProgramBase {
  programWorkouts?: IProgramWorkoutEditDTO[];
}

export interface IProgramFilter extends IBaseFilter {

  name?: string;
}

export type TProgramWorkoutEditRecord = Record<
  TDayOfWeek,
  IProgramWorkoutEditDTO[]
>;

interface IProgramWorkoutBase extends IEntity {
  daysOfWeek: DaysOfWeek[];
  programId?: string;
  workoutLevel?: WorkoutLevel | null;
  workoutGoal?: WorkoutGoal | null;
}
export interface IProgramWorkoutDTO extends IProgramWorkoutBase {
  workout?: IWorkoutDTO;
}
export interface IProgramWorkoutEditDTO extends IProgramWorkoutBase {
  workout?: IWorkoutEditDTO;
  crudOperation?: TCrudOperation;
}

export type TWorkoutGoal = (typeof WORKOUT_GOALS)[number];
export type TWorkoutLevel = (typeof WORKOUT_LEVELS)[number];
