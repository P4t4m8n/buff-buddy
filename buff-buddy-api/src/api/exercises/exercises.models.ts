import {
  ExerciseEquipment,
  ExerciseMuscle,
  ExerciseType,
} from "../../../prisma/generated/prisma";
import { IBaseFilter } from "../../shared/models/base.model";

export interface IExerciseFilter extends IBaseFilter {
  name?: string;
  types?: ExerciseType[];
  equipment?: ExerciseEquipment[];
  muscles?: ExerciseMuscle[];
}

export interface IExercise {
  id: string;
  name: string;
  youtubeUrl: string;
  types: ExerciseType[];
  equipment: ExerciseEquipment[];
  muscles: ExerciseMuscle[];
}
