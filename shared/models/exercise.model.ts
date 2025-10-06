import type { IBaseFilter, TCrudOperation } from "./app.model";
import type { IEntity } from "./entity.model";
import { EXERCISE_INFO } from "../consts/exercise.consts";
import type { ExerciseType } from "../../backend/prisma/generated/prisma";
import {
  IEquipment,
  IMuscle,
} from "../../backend/src/api/exercises/exercises.models";

interface IExerciseBase extends IEntity {
  name?: string;
  youtubeUrl?: string | null;
  isCompounded?: boolean;
  type?: ExerciseType | null;
  ownerId?: string | null;
}
export interface IExerciseDTO extends IExerciseBase {
  equipment?: Array<Partial<IEquipment>>;
  muscles?: Array<Partial<IMuscle>>;
}
export interface IExerciseEditDTO extends IExerciseBase {
  equipment: IExerciseInfoEdit[];
  muscles: IExerciseInfoEdit[];
}

export interface IExerciseFilter extends IBaseFilter {
  name?: string;
  types?: ExerciseType[] | string;
  equipment?: string[] | string;
  muscles?: string[] | string;
  isCompounded?: boolean | string;
}
export type TExerciseInfo = (typeof EXERCISE_INFO)[number];

interface IExerciseInfoEdit {
  name?: string | null;
  crudOperation?: TCrudOperation;
}
