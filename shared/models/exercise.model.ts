//Consts
import { EXERCISE_INFO } from "../consts/exercise.consts";
//Types
import type { IBaseFilter } from "./app.model";
import type { IMuscleEditDTO, IMuscleDTO } from "./muscle.model";
import type { IEquipmentDTO, IEquipmentEditDTO } from "./equipment.model";
import type { IEntity, IEntityDates } from "./entity.model";
import type { ExerciseType } from "../../backend/prisma/generated/prisma";

interface IExerciseBase extends IEntity, IEntityDates {
  name?: string;
  youtubeUrl?: string | null;
  isCompounded?: boolean | null;
  type?: ExerciseType | null;
  ownerId?: string | null;
}
export interface IExerciseDTO extends IExerciseBase {
  equipment?: IEquipmentDTO[];
  muscles?: IMuscleDTO[];
}
export interface IExerciseEditDTO extends IExerciseBase {
  equipment?: IEquipmentEditDTO[];
  muscles?: IMuscleEditDTO[];
}

export interface IExerciseFilter extends IBaseFilter {
  name?: string;
  types?: ExerciseType[] | string;
  equipment?: string[] | string;
  muscles?: string[] | string;
  isCompounded?: boolean | string;
}
export type TExerciseInfo = (typeof EXERCISE_INFO)[number];

