import type { IBaseFilter } from "./app.model";
import type { IEntity } from "./entity.model";
import type {
  IProgramExerciseDTO,
  IProgramExerciseEditDTO,
} from "./programExercise.model";

export interface IProgramDTO extends IEntity {
  name: string | null | undefined;
  note?: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  programExercises?: IProgramExerciseDTO[];
}

export interface IProgramEditDTO extends Omit<IProgramDTO, "programExercises"> {
  programExercises?: IProgramExerciseEditDTO[];
  //Only for Client to Server
  newProgramExercises?: IProgramExerciseEditDTO[];
  updateProgramExercises?: IProgramExerciseEditDTO[];
  deleteProgramExercises?: Partial<IProgramExerciseEditDTO>[];
}

export interface IProgramFilter extends IBaseFilter {}
