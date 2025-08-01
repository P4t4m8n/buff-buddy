import { IBaseFilter } from "../../../../shared/models/app.model";
import {
  ExerciseEquipment,
  ExerciseMuscle,
  ExerciseType,
} from "../../../prisma/generated/prisma";

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
  type: ExerciseType;
  equipment: ExerciseEquipment[];
  muscles: ExerciseMuscle[];
}
