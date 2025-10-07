import type { ExerciseType } from "../../../prisma/generated/prisma";

export interface IExercise {
  id: string;
  name: string;
  youtubeUrl: string;
  type: ExerciseType;
  equipment?: IEquipment[];
  isCompounded: boolean | null;
  muscles?: IMuscle[];
  ownerId: string | null;
}

export interface IMuscle {
  id: string;
  name: string;
  aliases?: { name: string; language: string | null }[];
}

export interface IEquipment {
  id: string;
  name: string;
  categories?: { name: string }[];
}
