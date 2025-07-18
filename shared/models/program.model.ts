import type { IBaseFilter, TDayOfWeek } from "../../buff-buddy-front/src/models/app.model";
import type { IEntity } from "./entity.model";
import type { IWorkoutDTO, IWorkoutEditDTO } from "../../buff-buddy-front/src/models/workout.model";

export interface IProgramDTO extends IEntity {
  name?: string | null | undefined;
  notes?: string;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
  isActive: boolean;
  workouts?: IWorkoutDTO[];
}

export interface IProgramEditDTO extends Omit<IProgramDTO, "workouts"> {
  workouts?: IWorkoutEditDTO[];
}

export interface IProgramFilter extends IBaseFilter {
  name?: string;
}

export type TProgramWorkoutEditRecord = Record<TDayOfWeek, IWorkoutDTO[]>;
