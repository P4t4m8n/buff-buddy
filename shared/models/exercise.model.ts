import type { IBaseFilter } from "./app.model";
import type { IEntity } from "./entity.model";
import {
  EXERCISE_EQUIPMENT,
  EXERCISE_INFO,
  EXERCISE_MUSCLES,
  EXERCISE_TYPES,
} from "../consts/exercise.consts";

interface IExerciseBase extends IEntity {
  name?: string;
  youtubeUrl?: string;
}
export interface IExerciseDTO extends IExerciseBase {
  types?: TExerciseType[];
  equipment?: TExerciseEquipment[];
  muscles?: TExerciseMuscle[];
}

export interface IExerciseFilter extends IBaseFilter {
  name?: string;
  typeId?: string;
  equipmentId?: string;
  muscleId?: string;
  typeName?: string;
  equipmentName?: string;
  muscleName?: string;
}

export type TExerciseInfo = (typeof EXERCISE_INFO)[number];

export type TExerciseMuscle = (typeof EXERCISE_MUSCLES)[number];

export type TExerciseEquipment = (typeof EXERCISE_EQUIPMENT)[number];

export type TExerciseType = (typeof EXERCISE_TYPES)[number];
