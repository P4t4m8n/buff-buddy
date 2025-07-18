import type { TDayOfWeek } from "./app.model";
import type { IEntity } from "../../../shared/models/entity.model";
import type { IExerciseDTO } from "./exercise.model";
import type {
  ICoreSetDTO,
  ICoreSetEditDTO,
} from "./set.model";

interface IBaseProgramExercise {
  order: number;
  notes?: string;
  daysOfWeek?: TDayOfWeek[];
}

export interface IProgramExerciseDTO extends IBaseProgramExercise, IEntity {
  exercise?: IExerciseDTO;
  coreSets: ICoreSetDTO[];
}

export interface IProgramExerciseEditDTO extends IBaseProgramExercise, IEntity {
  exercise?: IExerciseDTO;
  crudOperation?: TCrudOperation;
  programId?: string;
  exerciseId?: string;
  coreSets?: ICoreSetEditDTO[];
}

export const CRUD_OPERATIONS = [
  "create",
  "update",
  "edit",
  "delete",
  "read",
] as const;
export type TCrudOperation = (typeof CRUD_OPERATIONS)[number];

export type TProgramExerciseEditRecord = Record<
  TDayOfWeek,
  IProgramExerciseEditDTO[]
>;
