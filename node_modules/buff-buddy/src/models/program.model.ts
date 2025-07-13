import type { IBaseFilter } from "./app.model";
import type { IEntity } from "./entity.model";
import type {
  IProgramExerciseDTO,
  IProgramExerciseEditDTO,
} from "./programExercise.model";

export interface IProgramDTO extends IEntity {
  name?: string | null | undefined;
  notes?: string;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
  isActive: boolean;
  programExercises?: IProgramExerciseDTO[];
}

export interface IProgramEditDTO extends Omit<IProgramDTO, "programExercises"> {
  programExercises?: IProgramExerciseEditDTO[];
}

export interface IProgramFilter extends IBaseFilter {
  name?: string;
}
