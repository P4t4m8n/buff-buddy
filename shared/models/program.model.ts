import type { IBaseFilter, TDayOfWeek } from "./app.model";
import type { IEntity } from "./entity.model";
import type { IUserDTO } from "./user.model";
import type { IWorkoutDTO, IWorkoutEditDTO } from "./workout.model";

interface IProgramBase extends IEntity {
  name?: string | null | undefined;
  notes?: string | null;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
  isActive: boolean;
  owner?: Partial<IUserDTO>;
}

export interface IProgramDTO extends IProgramBase {
  workouts?: IWorkoutDTO[];
}

export interface IProgramEditDTO extends IProgramBase {
  workouts?: IWorkoutEditDTO[];
}

export interface IProgramFilter extends IBaseFilter {
  name?: string;
}

export type TProgramWorkoutEditRecord = Record<TDayOfWeek, IWorkoutDTO[]>;
