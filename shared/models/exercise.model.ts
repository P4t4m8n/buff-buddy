import type { IBaseFilter } from "./app.model";
import type { IEntity } from "./entity.model";
import {
  EXERCISE_EQUIPMENT,
  EXERCISE_INFO,
  EXERCISE_MUSCLES,
  EXERCISE_TYPES,
} from "../consts/exercise.consts";
import type {
  ExerciseEquipment,
  ExerciseType,
  ExerciseMuscle,
} from "../../backend/prisma/generated/prisma";

interface IExerciseBase extends IEntity {
  name?: string;
  youtubeUrl?: string | null;
}
export interface IExerciseDTO extends IExerciseBase {
  type?: TExerciseType | null;
  equipment?: TExerciseEquipment[];
  muscles?: TExerciseMuscle[];
  ownerId: string | null;
}

export interface IExerciseFilter extends IBaseFilter {
  name?: string;
  types?: ExerciseType[] | string;
  equipment?: ExerciseEquipment[] | string;
  muscles?: ExerciseMuscle[] | string;
}
export type TExerciseInfo = (typeof EXERCISE_INFO)[number];

export type TExerciseMuscle = (typeof EXERCISE_MUSCLES)[number];

export type TExerciseEquipment = (typeof EXERCISE_EQUIPMENT)[number];

export type TExerciseType = (typeof EXERCISE_TYPES)[number];
