import type { IBaseFilter } from "./app.model";
import type { IEntity } from "../../../shared/models/entity.model";

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

export const EXERCISE_INFO = ["types", "equipment", "muscles"];
export type TExerciseInfo = (typeof EXERCISE_INFO)[number];
export const EXERCISE_MUSCLES = [
  "abs",
  "back",
  "biceps",
  "calves",
  "chest",
  "core",
  "forearms",
  "glutes",
  "hamstrings",
  "hip_flexors",
  "lower_back",
  "neck",
  "obliques",
  "quads",
  "shoulders",
  "shins",
  "traps",
  "triceps",
  "upper_back",
] as const;
export type TExerciseMuscle = (typeof EXERCISE_MUSCLES)[number];

export const EXERCISE_EQUIPMENT = [
  "barbell",
  "body_weight",
  "cable",
  "dumbbell",
  "kettlebell",
  "medicine_ball",
  "none",
  "resistance_band",
] as const;
export type TExerciseEquipment = (typeof EXERCISE_EQUIPMENT)[number];

export const EXERCISE_TYPES = [
  "strength",
  "cardio",
  "flexibility",
  "balance",
] as const;
export type TExerciseType = (typeof EXERCISE_TYPES)[number];
