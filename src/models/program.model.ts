import type { IBaseFilter } from "./app.model";
import type { IDateRange } from "./calendar.model";
import type { IEntity } from "./entity.model";
import type {
  IProgramExerciseDTO,
  IProgramExerciseEditDTO,
} from "./programExercise.model";

export interface IProgramDTO extends IEntity {
  name?: string | null | undefined;
  note?: string;
  dateRange?: IDateRange;
  isActive: boolean;
  programExercises?: IProgramExerciseDTO[];
}

export interface IProgramEditDTO extends Omit<IProgramDTO, "programExercises"> {
  programExercises?: IProgramExerciseEditDTO[];
}

export interface IProgramFilter extends IBaseFilter {}
