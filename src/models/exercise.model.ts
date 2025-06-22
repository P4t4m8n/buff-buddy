import type { IBaseFilter } from "./app.model";
import type { IEntity } from "./entity.model";

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
  "abductors",
  "adductors",
  "biceps",
  "calves",
  "cardiovascular system",
  "deltoids",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "pectorals",
  "quadriceps",
  "trapezius",
  "triceps",
] as const;
export type TExerciseMuscle = (typeof EXERCISE_MUSCLES)[number];

export const EXERCISE_EQUIPMENT = [
  "barbell",
  "body weight",
  "cable",
  "dumbbell",
  "kettlebell",
  "medicine ball",
  "none",
  "resistance band",
] as const;
export type TExerciseEquipment = (typeof EXERCISE_EQUIPMENT)[number];

export const EXERCISE_TYPES = [
  "strength",
  "cardio",
  "flexibility",
  "balance",
] as const;
export type TExerciseType = (typeof EXERCISE_TYPES)[number];
